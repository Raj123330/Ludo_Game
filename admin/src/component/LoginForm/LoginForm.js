import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [formMode, setFormMode] = useState("login"); // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetFields = () => {
    setEmail("");
    setMobile("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formMode === "login") {
      if (email === "anjukushwaha9131@gmail.com" && password === "admin123") {
        window.location.href = "/dashboard";
      } else {
        alert("Invalid login credentials");
      }
    } else if (formMode === "signup") {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      console.log("User signed up:", { email, mobile, password });
      alert("Signup successful! Please login.");
      setFormMode("login");
      resetFields();
    } else if (formMode === "forgot") {
      // In real app, you'd send email to reset password
      alert(`Password reset link sent to ${email}`);
      setFormMode("login");
      resetFields();
    }
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <div className="form-box">
          <h2 className="title">Admin Panel</h2>
          <p className="subtitle">
            {formMode === "login"
              ? "Only for authorised users"
              : formMode === "signup"
              ? "Signup to get access"
              : "Reset your password"}
          </p>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {formMode === "signup" && (
              <>
                <label>Mobile</label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </>
            )}

            {formMode !== "forgot" && (
              <>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </>
            )}

            {formMode === "signup" && (
              <>
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </>
            )}

            <button type="submit">
              {formMode === "login"
                ? "LOGIN"
                : formMode === "signup"
                ? "SIGN UP"
                : "SEND RESET LINK"}
            </button>
          </form>

          <div className="form-footer">
            {formMode === "login" && (
              <>
                <p>
                  Don't have an account?{" "}
                  <span
                    onClick={() => {
                      setFormMode("signup");
                      resetFields();
                    }}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Sign up
                  </span>
                </p>
                <p>
                  <span
                    onClick={() => {
                      setFormMode("forgot");
                      resetFields();
                    }}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Forgot password?
                  </span>
                </p>
              </>
            )}

            {(formMode === "signup" || formMode === "forgot") && (
              <p>
                <span
                  onClick={() => {
                    setFormMode("login");
                    resetFields();
                  }}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  Back to Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="image-section">
        <img src="../../asset/Ludo.jpg" alt="Ludo Game" />
      </div>
    </div>
  );
};

export default LoginForm;

//alag model bana padega for admin registration and login ke liye
//then alag se data store krna padega only admins ka
