import React from "react";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function Header() {
  const appName = config["app.name"];
  const appRoutes = config["app.routes"];
  const appLogo = config["app.logo"];
  const { Header } = config["app.components"];
  const searchInputPlaceholder = Header["search.input.placeholder"];
  const icons = Header["nav.icons"];

  const linkAndIconTo = (path) => {
    const icon = icons[path];
    const link = appRoutes[path];
    return (
      <Link to={link}>
        <Icon icon={icon} />
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
    <header>
      <div className="header_left-content">
        <Icon icon={appLogo} />
        <h1>{appName}</h1>
      </div>
      <div className="header_center-content">
        <input type="text" placeholder={searchInputPlaceholder} />
      </div>
      <nav className="header_right-content">
        <ul>
          <li>{linkAndIconTo("home")}</li>
          <li>{linkAndIconTo("direct")}</li>
          <li>{linkAndIconTo("new")}</li>
          <li>{buttonAndIconTo("notify")}</li>
          <li>{buttonAndIconTo("menu")}</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
