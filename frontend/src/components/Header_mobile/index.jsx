import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import HeaderAside_mobile from "../HeaderAside_mobile";
import SearchResults from "../SearchResults";
import "./styles/Header.css";
import "./styles/Header-mobile.css";

function Header_mobile({ page, token }) {
  // Config
  const appName = config["app.name"];
  const appRoutes = config["app.routes"];
  const appLogo = config["app.logo"];
  const { Header } = config["app.components"];
  const searchInputPlaceholder = Header["search.input.placeholder"];
  const icons = Header["nav.icons"];

  // Hooks
  const params = useParams();
  const [openMenu, setOpenMenu] = useState(false);
  const [querySearch, setQuerySearch] = useState("");

  // Constants
  const inPage = (current, compare) => current === compare;
  const isLogged = token;

  // Functions
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

  // Handles
  const handleOpenCloseMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleSearchChange = ({ target }) => {
    const { value } = target;
    setQuerySearch(value);
  };

  // useEffect
  useEffect(() => {
    const clearSearchBar = () => {
      setQuerySearch("");
      setOpenMenu(false);
    };
    clearSearchBar();
  }, [params]);

  return (
    <header className="header-mobile">
      <div className="header-mobile_left-content">
        <Icon icon={appLogo} />
        <h1>{appName}</h1>
      </div>
      <div className="header-mobile_center-content">
        <input
          type="search"
          placeholder={searchInputPlaceholder}
          value={querySearch}
          onChange={handleSearchChange}
        />
        {querySearch && <SearchResults query={querySearch} />}
      </div>
      <nav className="header-mobile_right-content">
        <ul>
          {isLogged && (
            <>
              <li className="header-mobile_nav-icon">{linkAndIconTo("home")}</li>
              <li className="header-mobile_nav-icon">{linkAndIconTo("direct")}</li>
              <li className="header-mobile_nav-icon">{linkAndIconTo("saved")}</li>
              <li className="header-mobile_nav-icon">{buttonAndIconTo("notify")}</li>
              <li className="header-mobile_nav-icon menu">
                {buttonAndIconTo("menu", handleOpenCloseMenu)}
                {openMenu && <HeaderAside_mobile />}
              </li>
            </>
          )}
          {!isLogged && (
            <Link to={appRoutes["login"]} className="header-mobile_login-btn">
              Login
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Header_mobile);

Header_mobile.propTypes = {
  page: PropTypes.string,
  token: PropTypes.string,
};
