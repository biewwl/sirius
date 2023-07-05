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
import "./styles/LoginRegister-mobile.css";

function LoginRegister({ page, dispatch }) {
  const isLogin = page === "login";
  const isRegister = page === "register";

  // Component vars config

  const components = config["app.components"];
  const name = config["app.name"];
  const logo = config["app.logo"];

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

  const handleIconClick = ({ target }) => {
    const parentPassword = target.closest(".--password");
    if (parentPassword) {
      const inputPassword = parentPassword.firstElementChild;
      const inputType = inputPassword.type;
      if (inputType === "password") {
        inputPassword.type = "text";
      } else {
        inputPassword.type = "password";
      }
    }
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
      <section className={customClassName("login-header")}>
        <Icon icon={logo} className={customClassName("login-header__logo")} />
        <h3 className={customClassName("login-header__name")}>{name}</h3>
      </section>
      <form
        action=""
        method="post"
        className={customClassName("form")}
        onSubmit={handleSubmitForm}
      >
        <section className={customClassName("form__text")}>
          <span className={customClassName("form__text__welcome-message")}>
            {isLogin && "Welcome Back"}
            {isRegister && "Start for Free"}
          </span>
          <h1 className={customClassName("form__text__action-message")}>
            {isLogin && "Login in to your account"}
            {isRegister && "Create new account"}
            <span
              className={customClassName("form__text__action-message__dot")}
            >
              .
            </span>
          </h1>
          <p className={customClassName("form__text__alternate-form-text")}>
            {textToAlternateForm}
            <Link
              to={pathToAlternateForm[page]}
              onClick={clearFormData}
              className={customClassName(
                "form__text__alternate-form-text__link"
              )}
            >
              {linkTextToAlternateForm}
            </Link>
          </p>
        </section>
        <div className={customClassName("form__inputs")}>
          {inputs.map((input, i) => {
            const { name, type, placeholder, icon } = input;
            return (
              <div
                key={i}
                className={customClassName(
                  `form__inputs__input-area --${name} --${page}`
                )}
              >
                <input
                  className={customClassName(
                    `form__inputs__input-area__input --${name}`
                  )}
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleFormChange}
                  required
                  spellCheck={false}
                />
                <span
                  className={customClassName(
                    `form__inputs__input-area__placeholder`
                  )}
                >
                  {placeholder}
                </span>
                <Icon
                  icon={icon}
                  className={customClassName(`form__inputs__input-area__icon`)}
                  onClick={handleIconClick}
                />
              </div>
            );
          })}
          {formError && (
            <span className={customClassName("form__inputs__error-feedback")}>
              {formError}
            </span>
          )}
        </div>
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
