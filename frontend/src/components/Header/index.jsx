import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import SearchResults from "../SearchResults";
import "./styles/Header.css";
import "./styles/Header-mobile.css";

function Header() {
  // Config
  const appName = config["app.name"];
  const appLogo = config["app.logo"];
  const { Header } = config["app.components"];
  const searchInputPlaceholder = Header["search.input.placeholder"];

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
};
