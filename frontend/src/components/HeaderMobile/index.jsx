import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import HeaderAsideMobile from "../HeaderAsideMobile";
import SearchResults from "../SearchResults";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/HeaderMobile.css";

function HeaderMobile({ page, token }) {
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
      <Link
        to={link}
        className={customClassName("navigation__list__item__link")}
      >
        <Icon
          icon={icon}
          className={customClassName(
            "navigation__list__item__link__icon",
            null,
            classSelected
          )}
        />
      </Link>
    );
  };

  const buttonAndIconTo = (component, callback) => {
    const icon = icons[component];
    return (
      <button
        onClick={callback}
        className={customClassName("navigation__list__item__button")}
      >
        <Icon
          icon={icon}
          className={customClassName("navigation__list__item__button__icon")}
        />
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

  const primaryClassName = "header-mobile-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <header className={primaryClassName}>
      <div className={customClassName("logo-and-name")}>
        <Icon
          icon={appLogo}
          className={customClassName("logo-and-name__icon")}
        />
        <h1 className={customClassName("logo-and-name__name")}>{appName}</h1>
      </div>
      <div className={customClassName("search")}>
        <input
          type="search"
          placeholder={searchInputPlaceholder}
          value={querySearch}
          onChange={handleSearchChange}
          className={customClassName("search__input")}
        />
        {querySearch && <SearchResults query={querySearch} />}
      </div>
      <nav className={customClassName("navigation")}>
        <ul className={customClassName("navigation__list")}>
          {isLogged && (
            <>
              <li className={customClassName("navigation__list__item")}>
                {linkAndIconTo("home")}
              </li>
              <li className={customClassName("navigation__list__item")}>
                {linkAndIconTo("direct")}
              </li>
              <li className={customClassName("navigation__list__item")}>
                {linkAndIconTo("saved")}
              </li>
              <li className={customClassName("navigation__list__item")}>
                {buttonAndIconTo("notify")}
              </li>
              <li
                className={customClassName(
                  "navigation__list__item",
                  null,
                  "menu"
                )}
              >
                {buttonAndIconTo("menu", handleOpenCloseMenu)}
                {openMenu && <HeaderAsideMobile />}
              </li>
            </>
          )}
          {!isLogged && (
            <Link to={appRoutes["login"]} className={customClassName("navigation__list__login-btn")}>
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

export default connect(mapStateToProps)(HeaderMobile);

HeaderMobile.propTypes = {
  page: PropTypes.string,
  token: PropTypes.string,
};
