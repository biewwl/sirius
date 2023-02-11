import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import config from "./app_config.json";
import "./App.css";

export default function App() {
  const { home, login, register } = config["app.routes"];

  const isLogged = false;

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
