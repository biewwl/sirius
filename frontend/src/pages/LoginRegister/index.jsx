import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../app_config.json";
import { login, register } from "../../helpers/fetch";
import { loginAction } from "../../redux/actions/userAction";
import validateRegister from "../../helpers/schemas/registerJoi";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/LoginRegister.css";

function LoginRegister({ page, dispatch }) {
  const isLogin = page === "login";
  const isRegister = page === "register";

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

  const initialFormData = {
    name: "",
    nick: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");

  // Functions

  const handleFormChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
    setFormError("");
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const fetchLogin = await login(formData);
      const { error } = fetchLogin;
      if (error) {
        return setFormError(error);
      }
      dispatch(loginAction(fetchLogin));
    } else if (isRegister) {
      const fetchRegister = await register(formData);
      const { error } = fetchRegister;
      if (error) {
        return setFormError(error);
      }
      dispatch(loginAction(fetchRegister));
    }
  };

  const clearFormData = () => {
    setFormError("");
  };

  // Verify Form
  const verifyFieldsForm = useCallback(() => {
    const valid = validateRegister(formData);
    const { error } = valid;
    if (error && isRegister) {
      setFormError(error.message);
    }
  });

  // UseEffects
  useEffect(() => {
    const clearError = () => {
      setFormError("");
    };
    clearError();
    verifyFieldsForm();
  }, [page]);

  useEffect(() => {
    verifyFieldsForm();
  }, [formData]);

  //ClassNames
  const primaryClassName = "sign-page";
  const customClassName = generateClassName(primaryClassName);

  return (
    <div className={primaryClassName}>
      <form
        action=""
        method="post"
        className={customClassName("form")}
        onSubmit={handleSubmitForm}
      >
        <div className={customClassName("form__header")}>
          <Icon icon={logo} className={customClassName("form__header__logo")} />
          <h1 className={customClassName("form__header__name")}>{name}</h1>
          <p className={customClassName("form__header__slogan")}>{slogan}</p>
        </div>
        <div className={customClassName("form__inputs")}>
          {inputs.map((input, i) => {
            const { name, type, placeholder } = input;
            return (
              <input
                className={customClassName("form__inputs__input")}
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
          {formError && (
            <span className={customClassName("form__inputs__error-feedback")}>
              {formError}
            </span>
          )}
        </div>
        <p className={customClassName("form__alternate-form-text")}>
          {textToAlternateForm}
          <Link
            to={pathToAlternateForm[page]}
            onClick={clearFormData}
            className={customClassName("form__alternate-form-text__link")}
          >
            {linkTextToAlternateForm}
          </Link>
        </p>
        <button type="submit" className={customClassName("form__submit-btn")}>
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
