import React, { useState } from "react";
import "../App.css";

// PUBLIC_INTERFACE
/**
 * LoginRegister modal component (acts as login/register UI).
 * Props:
 *  - open: boolean (show/hide)
 *  - onClose: function to close modal
 *  - onAuth: function(userObj) called on successful login/register
 */
function LoginRegister({ open, onClose, onAuth }) {
  const [isRegister, setIsRegister] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  // Reset on open/close or mode switch
  React.useEffect(() => {
    if (open) {
      setFields({ name: "", email: "", password: "", confirm: "" });
      setError("");
    }
  }, [open, isRegister]);

  if (!open) return null;

  function handleSwitchMode(e) {
    e.preventDefault();
    setIsRegister(!isRegister);
  }

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isRegister) {
      // Simulated register
      if (!fields.name.trim() || !fields.email.trim() || !fields.password) {
        setError("All fields required.");
        return;
      }
      if (fields.password.length < 6) {
        setError("Password at least 6 characters.");
        return;
      }
      if (fields.password !== fields.confirm) {
        setError("Passwords do not match.");
        return;
      }
      // Simulate registration success & login
      onAuth({
        name: fields.name,
        email: fields.email,
        orders: [],
      });
      onClose();
    } else {
      // Simulated login
      if (!fields.email.trim() || !fields.password) {
        setError("Email and password required.");
        return;
      }
      // Accept login with any input (simulate found user)
      onAuth({
        name: "Demo User",
        email: fields.email,
        orders: [],
      });
      onClose();
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-box">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">&times;</button>
        <h3 style={{marginBottom: 9}}>
          {isRegister ? "Register for AutoSpareHub" : "Login to AutoSpareHub"}
        </h3>
        <form className="modal-form" onSubmit={handleSubmit} autoComplete="off">
          {isRegister && (
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                value={fields.name}
                onChange={handleChange}
                autoFocus
                required
                autoComplete="off"
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={fields.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          {isRegister && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                name="confirm"
                type="password"
                value={fields.confirm}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {error && (
            <div className="form-error" style={{color: "#e53", marginBottom: 6, fontSize: 15}}>
              {error}
            </div>
          )}
          <button className="btn" type="submit" style={{ width: "100%", marginTop: 8 }}>
            {isRegister ? "Register" : "Login"}
          </button>
          <div style={{ marginTop: 14, textAlign: "center" }}>
            {isRegister ? (
              <span>
                Have an account?{" "}
                <a href="#" style={{color:"var(--accent-color)", textDecoration:"underline"}} onClick={handleSwitchMode}>
                  Login
                </a>
              </span>
            ) : (
              <span>
                New user?{" "}
                <a href="#" style={{color:"var(--accent-color)", textDecoration:"underline"}} onClick={handleSwitchMode}>
                  Register
                </a>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;
