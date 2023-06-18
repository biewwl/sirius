import React from "react";
import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import config from "./app_config.json";
import { connect } from "react-redux";
import Profile from "./pages/Profile";
import { loginAction } from "./redux/actions/userAction";
import NotFound from "./pages/NotFound";
import Follows from "./pages/Follows";
import "./App.css";
import "./varsCSS/vars.css";
import Post from "./pages/Post";
import Saved from "./pages/Saved";

function App({ token, dispatch }) {
  const { home, login, register, profile, followers, following, post } =
    config["app.routes"];

  const isLogged = token;
  if (isLogged) dispatch(loginAction(token));

  const ConditionalRouter = (PATH, CASE, ELEMENT, REDIRECT) => {
    return (
      <Route
        path={PATH}
        element={CASE ? ELEMENT : <Navigate to={REDIRECT} />}
      />
    );
  };

  return (
    <div className="App">
      <Routes>
        {ConditionalRouter(home, isLogged, <Home />, login)}
        {ConditionalRouter(
          login,
          !isLogged,
          <LoginRegister page="login" />,
          home
        )}
        {ConditionalRouter(
          register,
          !isLogged,
          <LoginRegister page="register" />,
          home
        )}
        <Route path={profile} element={<Profile />} />
        <Route path="/404" element={<NotFound />} />
        <Route path={followers} element={<Follows type="followers" />} />
        <Route path={following} element={<Follows type="following" />} />
        <Route path={post} element={<Post />} />
        {ConditionalRouter("/saved", isLogged, <Saved />, home)}
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(App);

App.propTypes = {
  token: PropTypes.string,
  dispatch: PropTypes.func,
};
