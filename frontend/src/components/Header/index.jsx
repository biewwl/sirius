import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import SearchResults from "../SearchResults";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/Header.css";

function Header({ token }) {
  // Config
  const appName = config["app.name"];
  const appLogo = config["app.logo"];
  const appSlogan = config["app.slogan"];
  const { Header } = config["app.components"];
  const searchInputPlaceholder = Header["search.input.placeholder"];
  const appRoutes = config["app.routes"];
  const isLogged = token;

  // Hooks
  const params = useParams();
  // const [openMenu, setOpenMenu] = useState(false);
  const [querySearch, setQuerySearch] = useState("");

  // Handles

  const handleSearchChange = ({ target }) => {
    const { value } = target;
    setQuerySearch(value);
  };

  // useEffect
  useEffect(() => {
    const clearSearchBar = () => {
      setQuerySearch("");
      // setOpenMenu(false);
    };
    clearSearchBar();
  }, [params]);

  const primaryClassName = "header-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <header className={primaryClassName}>
      <Link to="/" className={customClassName("logo-and-name-and-slogan")}>
        <Icon
          icon={appLogo}
          className={customClassName("logo-and-name-and-slogan__logo")}
        />
        <h1 className={customClassName("logo-and-name-and-slogan__name")}>
          {appName}
        </h1>
        •
        <span className={customClassName("logo-and-name-and-slogan__slogan")}>
          {appSlogan}
        </span>
      </Link>
      <div className={customClassName("search-and-login")}>
        <div className={customClassName("search-and-login__search")}>
          <input
            type="search"
            placeholder={searchInputPlaceholder}
            value={querySearch}
            onChange={handleSearchChange}
            className={customClassName("search-and-login__search__input")}
          />
          {querySearch && <SearchResults query={querySearch} />}
        </div>
        {!isLogged && (
          <Link
            to={appRoutes["login"]}
            className={customClassName("search-and-login__login")}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  token: PropTypes.string,
};
