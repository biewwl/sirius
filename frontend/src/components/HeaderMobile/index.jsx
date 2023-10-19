import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import SearchResults from "../SearchResults";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/HeaderMobile.css";

function HeaderMobile({ page, token, accountDataREDUX }) {
  // Config
  // const appName = config["app.name"];
  const appRoutes = config["app.routes"];
  const appLogo = config["app.logo"];
  const { Header } = config["app.components"];
  const searchInputPlaceholder = Header["search.input.placeholder"];
  const icons = Header["nav.icons"];

  // Hooks
  const params = useParams();
  const [querySearch, setQuerySearch] = useState("");

  // Constants
  const inPage = (current, compare) => current === compare;
  const isLogged = token;

  // Functions
  const linkAndIconTo = (path) => {
    const icon = icons[path];
    const link = appRoutes[path];
    const classSelected = inPage(page, path) ? "selected" : "";
    const onlyLink = link.split("/:")[0];
    return (
      <Link
        to={onlyLink}
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


  const isInPage = (page) => {
    let currentPage = "";
    if (location.pathname === "/") currentPage = "home";
    if (location.pathname === "/direct") currentPage = "direct";
    if (location.pathname === "/saved") currentPage = "saved";
    if (location.pathname === "/notifications") currentPage = "notifications";
    if (currentPage === page) {
      return true;
    } else {
      return false;
    }
  };

  const classPageSelected = (page) => {
    if (isInPage(page)) return " selected";
    return "";
  };

  // Handles

  const handleSearchChange = ({ target }) => {
    const { value } = target;
    setQuerySearch(value);
  };

  // useEffect
  useEffect(() => {
    const clearSearchBar = () => {
      setQuerySearch("");
    };
    clearSearchBar();
  }, [params]);

  const primaryClassName = "header-mobile-component";
  const customClassName = generateClassName(primaryClassName);

  const { nick, avatarUrl } = accountDataREDUX;

  return (
    <header className={primaryClassName}>
      <div className={customClassName("logo-and-name")}>
        <Icon
          icon={appLogo}
          className={customClassName("logo-and-name__icon")}
        />
        {/* <h1 className={customClassName("logo-and-name__name")}>{appName}</h1> */}
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
              <li
                className={customClassName(
                  `navigation__list__item${classPageSelected("home")}`
                )}
              >
                {linkAndIconTo("home")}
              </li>
              <li
                className={customClassName(
                  `navigation__list__item${classPageSelected("direct")}`
                )}
              >
                {linkAndIconTo("direct")}
              </li>
              <li
                className={customClassName(
                  `navigation__list__item${classPageSelected("saved")}`
                )}
              >
                {linkAndIconTo("saved")}
              </li>
              <li
                className={customClassName(
                  `navigation__list__item${classPageSelected("notifications")}`
                )}
              >
                {linkAndIconTo("notifications")}
              </li>
              <li className={customClassName("navigation__list__item")}>
                <Link
                  to={`/p/${nick}`}
                  className={customClassName("navigation__list__item__link")}
                >
                  <img
                    src={avatarUrl}
                    alt=""
                    className={customClassName(
                      "navigation__list__item__link__avatar"
                    )}
                  />
                </Link>
              </li>
            </>
          )}
          {!isLogged && (
            <Link
              to={appRoutes["login"]}
              className={customClassName("navigation__list__login-btn")}
            >
              Login
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(HeaderMobile);

HeaderMobile.propTypes = {
  page: PropTypes.string,
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
