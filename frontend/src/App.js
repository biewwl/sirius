import React from "react";
import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import config from "./app_config.json";
import { connect } from "react-redux";
import "./App.css";
import "./colors/colors.css";

function App({ token }) {
  const { home, login, register } = config["app.routes"];

  const isLogged = token;

  return (
    <div className="App">
      <Routes>
        <Route
          path={home}
          element={isLogged ? <Home /> : <Navigate to={login} />}
        />
        <Route
          path={login}
          element={
            !isLogged ? <LoginRegister page="login" /> : <Navigate to={home} />
          }
        />
        <Route
          path={register}
          element={
            !isLogged ? (
              <LoginRegister page="register" />
            ) : (
              <Navigate to={home} />
            )
          }
        />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
})

export default connect(mapStateToProps)(App);

App.propTypes = {
  token: PropTypes.string,
};
