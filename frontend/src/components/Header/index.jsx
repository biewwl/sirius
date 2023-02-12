import React from "react";
import PropTypes from "prop-types";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import "./styles/Header.css";
import "./styles/Header-mobile.css";

function Header({ page }) {
  const appName = config["app.name"];
  const appRoutes = config["app.routes"];
  const appLogo = config["app.logo"];
  const { Header } = config["app.components"];
  const searchInputPlaceholder = Header["search.input.placeholder"];
  const icons = Header["nav.icons"];

  const inPage = (current, compare) => current === compare;

  const linkAndIconTo = (path) => {
    const icon = icons[path];
    const link = appRoutes[path];

    const classSelected = inPage(page, path) ? "selected" : "";

    return (
      <Link to={link}>
        <Icon icon={icon} className={classSelected} />
      </Link>
    );
  };

  const buttonAndIconTo = (component, callback) => {
    const icon = icons[component];
    return (
      <button onClick={callback}>
        <Icon icon={icon} />
      </button>
    );
  };

  return (
    <header className="header">
      <div className="header_left-content">
        <Icon icon={appLogo} />
        <h1>{appName}</h1>
      </div>
      <div className="header_center-content">
        <input type="search" placeholder={searchInputPlaceholder} />
      </div>
      <nav className="header_right-content">
        <ul>
          <li className="header_nav-icon">{linkAndIconTo("home")}</li>
          <li className="header_nav-icon">{linkAndIconTo("direct")}</li>
          <li className="header_nav-icon">{linkAndIconTo("new")}</li>
          <li className="header_nav-icon">{buttonAndIconTo("notify")}</li>
          <li className="header_nav-icon">{buttonAndIconTo("menu")}</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

Header.propTypes = {
  page: PropTypes.string,
};
