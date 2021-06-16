import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import BaseLayout from "../layouts/BaseLayout";
import "../../styles/front/users.scss";

const Signup = function (props) {
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit() {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.toLowerCase())) {
      setFormErrorMessage("Email is invalid");
      return;
    }

    if (username.length < 4) {
      setFormErrorMessage("Username is invalid");
      return;
    }

    if (password.length < 6) {
      setFormErrorMessage("Password is invalid");
      return;
    }

    if (password !== passwordConfirmation) {
      setFormErrorMessage("Password confirmation is invalid");
      return;
    }

    setFormErrorMessage("");
    const params = {
      user: {
        email: email,
        username: username,
        password: password,
      },
    };

    fetch(`/users`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": props.formToken,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          window.location.href = "/signin";
        }
      })
      .catch((err) => console.error("Error:", err));
  }

  return (
    <BaseLayout {...props}>
      <div className="form d-flex flex-column align-items-center">
        <div className="error-message">{formErrorMessage}</div>
        <div className="input-wrap d-flex flex-column justify-content-center align-items-center">
          <div className="after-input">
            <div className="input-hint hide">Email</div>
            <input
              className="email-input"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="input-wrap d-flex flex-column justify-content-center align-items-center">
          <div className="after-input">
            <div className="input-hint hide">Username</div>
            <input
              className="username-input"
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="input-wrap d-flex flex-column justify-content-center align-items-center">
          <div className="after-input">
            <div className="input-hint hide">Password confirmation</div>
            <input
              className="password-confirmation-input"
              type="password"
              placeholder="Password Confirmation"
              name="password"
              data-name="password-confirmation"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
        </div>

        <button className="btn" onClick={() => handleSubmit()}>
          <span className="hide">
            <i className="fas fa-spinner fa-spin"></i>
          </span>
          <span className="text">Submit</span>
        </button>
      </div>
    </BaseLayout>
  );
};

export default Signup;
