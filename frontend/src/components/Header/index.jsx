import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import HeaderMenu from "../HeaderMenu";
import SearchResults from "../SearchResults";
import { logoutAction } from "../../redux/actions/userAction";
import "./styles/Header.css";
import "./styles/Header-mobile.css";

function Header({ dispatch, page, token }) {
  // Config
  const appName = config["app.name"];
  const appRoutes = config["app.routes"];
  const appLogo = config["app.logo"];
  const { Header } = config["app.components"];
  const searchInputPlaceholder = Header["search.input.placeholder"];
  const icons = Header["nav.icons"];

  // Hooks
  const params = useParams();
  // const [openMenu, setOpenMenu] = useState(false);
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
  // const handleOpenCloseMenu = () => {
  //   setOpenMenu(!openMenu);
  // };

  const handleSearchChange = ({ target }) => {
    const { value } = target;
    setQuerySearch(value);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  // useEffect
  useEffect(() => {
    const clearSearchBar = () => {
      setQuerySearch("");
      // setOpenMenu(false);
    };
    clearSearchBar();
  }, [params]);

  return (
    <header className="header">
      <div className="header_left-content">
        <Icon icon={appLogo} />
        <h1>{appName}</h1>
      </div>
      <div className="header_center-content">
        <input
          type="search"
          placeholder={searchInputPlaceholder}
          value={querySearch}
          onChange={handleSearchChange}
        />
        {querySearch && <SearchResults query={querySearch} />}
      </div>
      <nav className="header_left-bar">
        <HeaderMenu />
        <div className="header_left-bar-buttons">
          <ul>
            {isLogged && (
              <>
                {/* <li className="header_nav-link">
                    {linkAndIconTo("home")}
                  </li> */}
                <li className="header_nav-link">{linkAndIconTo("direct")}</li>
                <li className="header_nav-link">{linkAndIconTo("new")}</li>
                <li className="header_nav-link">{buttonAndIconTo("notify")}</li>
                {/* <li className="header_nav-link menu">
                    {buttonAndIconTo("menu", handleOpenCloseMenu)}
                    {openMenu && <HeaderMenu />}
                  </li> */}
              </>
            )}
            {!isLogged && (
              <Link to={appRoutes["login"]} className="header_login-btn">
                Login
              </Link>
            )}
          </ul>
          <div className="logout-settings">
            <button onClick={handleLogout} className="header-menu_icon logout">
              {/* <span>Logout</span> */}
              <Icon icon="teenyicons:logout-solid" />
            </button>
            <button className="header-menu_icon settings">
              {/* <span>Settings</span> */}
              <Icon icon="ph:gear" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  page: PropTypes.string,
  token: PropTypes.string,
  dispatch: PropTypes.func,
};
