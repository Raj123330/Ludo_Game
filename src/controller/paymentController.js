// controllers/paymentController.js
import  { encrypt, decrypt } from "../util/encryptor.js"
const { Payment } = require("../models");

const SABPAISA_URL =
  "https://stage-securepay.sabpaisa.in/SabPaisa/sabPaisaInit?v=1"; // Use live in prod
const CALLBACK_URL = "https://your-backend.com/api/payment/callback";
const CLIENT_CODE = "DEMO1";
const USERNAME = "your_username";
const PASSWORD = "your_password";
const AUTH_KEY = Buffer.from("your_32_byte_key"); // 32 bytes
const AUTH_IV = Buffer.from("your_16_byte_iv"); // 16 bytes

export const  initiatePayment = async (req, res) => {
  try {
    const { name, email, mobile, amount } = req.body;
    const clientTxnId = "TXN" + Date.now();

    const formData = [
      `payerName=${name}`,
      `payerEmail=${email}`,
      `payerMobile=${mobile}`,
      `clientTxnId=${clientTxnId}`,
      `payerAddress=NA`,
      `amount=${amount}`,
      `clientCode=${CLIENT_CODE}`,
      `transUserName=${USERNAME}`,
      `transUserPassword=${PASSWORD}`,
      `callbackUrl=${CALLBACK_URL}`,
      `channelId=W`,
      `transDate=${new Date().toString()}`,
    ].join("&");

    const encData = encrypt(AUTH_KEY, AUTH_IV, formData);

    await Payment.create({
      clientTxnId,
      name,
      email,
      mobile,
      amount,
      status: "INITIATED",
    });

    res.status(200).json({
      url: SABPAISA_URL,
      encData,
      clientCode: CLIENT_CODE,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Payment initiation failed", error: err.message });
  }
};

export const paymentCallback = async (req, res) => {
  try {
    const encResponse = req.body.encResponse;
    const decrypted = decrypt(AUTH_KEY, AUTH_IV, encResponse);

    const params = {};
    decrypted.split("&").forEach((pair) => {
      const [key, val] = pair.split("=");
      params[key] = val;
    });

    const txn = await Payment.findOne({
      where: { clientTxnId: params.clientTxnId },
    });

    if (txn) {
      await txn.update({
        status: params.status,
        sabPaisaTxnId: params.SabPaisaTxnId,
        bankTxnId: params.bankTxnId,
        paymentMode: params.paymentMode,
        paidAmount: params.paidAmount,
      });
    }

    return res.status(200).send("OK");
  } catch (err) {
    res.status(500).json({ message: "Callback error", error: err.message });
  }
};
