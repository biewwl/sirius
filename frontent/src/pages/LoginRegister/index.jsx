import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../app_config.json";
import { login } from "../../helpers/fetch";
import { loginAction } from "../../redux/actions/userAction";
import "./styles/LoginRegister.css";

function LoginRegister({ page, dispatch }) {
  // Component vars config

  const components = config["app.components"];
  const name = config["app.name"];
  const logo = config["app.logo"];
  const slogan = config["app.slogan"];

  const { LoginRegister: component_config } = components;

  const {
    textToAlternateForm,
    linkTextToAlternateForm,
    btnSubmitText,
    inputs,
  } = component_config[page];

  const pathToAlternateForm = {
    login: "/register",
    register: "/login",
  };

  // Component State

  const [formData, setFormData] = useState({
    name: "",
    nick: "",
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState("");

// Functions

  const handleFormChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
    setFormError("");
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const fetchLogin = await login(formData.nick, formData.password);
    const { error } = fetchLogin;
    if (error) {
      return setFormError(error);
    }
    dispatch(loginAction(fetchLogin));
  };

  return (
    <div className="page_login-register">
      <form
        action=""
        method="post"
        className="login-register_form"
        onSubmit={handleSubmitForm}
      >
        <div className="form_header">
          <Icon icon={logo} className="logo" />
          <h1 className="name">{name}</h1>
          <p className="slogan">{slogan}</p>
        </div>
        <div className="inputs">
          {inputs.map((input, i) => {
            const { name, type, placeholder } = input;
            return (
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleFormChange}
                key={i}
                required
              />
            );
          })}
          {formError && <span className="form-error">{formError}</span>}
        </div>
        <p className="alternate-form">
          {textToAlternateForm}
          <Link to={pathToAlternateForm[page]}>{linkTextToAlternateForm}</Link>
        </p>
        <button type="submit" className="btn-submit">
          {btnSubmitText}
        </button>
      </form>
    </div>
  );
}

export default connect()(LoginRegister);

LoginRegister.propTypes = {
  page: PropTypes.string,
  dispatch: PropTypes.func,
};
