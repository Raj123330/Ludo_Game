// utils/twilio.js
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

const client = twilio(accountSid, authToken);

export { client, twilioPhone };
