import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../../styles/users.scss";


const Signin = function () {
  const [formErrorMessage, setFormErrorMessage] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignin() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.toLowerCase())) {
      setFormErrorMessage("Email is invalid");
      return;
    }

    if (password.length < 6) {
      setFormErrorMessage("Password is invalid");
      return;
    }

    setFormErrorMessage("");
    const params = {
      email: email,
      password: password
    };

    fetch(`/signin`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementById('form-token').value
      },
    }).then(res => {
      if (res.status === 200) {
        window.location.href = "/users/repos";
      }
    })
    .catch(err => console.error("Error:", err));
  }
  
  return (
    <>
      <div className="form d-flex flex-column align-items-center">
        <div className="error-message">{ formErrorMessage }</div>
        <div className="input-wrap d-flex flex-column justify-content-center align-items-center">
          <div className="after-input">
            <div className="input-hint hide">Email</div>
            <input
              className="email-input"
              type="email"
              placeholder="Email"
              name="email"
              data-name="email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="input-wrap d-flex flex-column justify-content-center align-items-center">
          <div className="after-input">
            <div className="input-hint hide">Password</div>
            <input
              className="password-input"
              type="password"
              placeholder="Password"
              name="password"
              data-name="password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="login-btn" onClick={() => handleSignin()}>
          <span className="hide">
            <i className="fas fa-spinner fa-spin"></i>
          </span>
          <span>Login</span>
        </button>
      </div>
    </>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Signin />, document.getElementById("signin-page"));
});
