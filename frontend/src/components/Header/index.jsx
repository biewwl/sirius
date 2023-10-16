import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import SearchResults from "../SearchResults";
import generateClassName from "../../helpers/generateClassBEM";
import noPicProfile from "../../images/no-pic-profile.jpg";
import "./styles/Header.css";
import CreatePost from "../CreatePost";

function Header({ accountDataREDUX, token }) {
  // Config
  const appName = config["app.name"];
  const appLogo = config["app.logo"];
  const { Header } = config["app.components"];
  const searchInputPlaceholder = Header["search.input.placeholder"];
  const appRoutes = config["app.routes"];
  const isLogged = token;

  // Hooks
  const params = useParams();
  const [createPost, setCreatePost] = useState(false);
  const [querySearch, setQuerySearch] = useState("");

  // Handles

  const handleSearchChange = ({ target }) => {
    const { value } = target;
    setQuerySearch(value);
  };

  const handleCreatePost = () => {
    setCreatePost(!createPost);
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

  const { avatarUrl, nick } = accountDataREDUX;

  const avatarImage = avatarUrl ?? noPicProfile;

  return (
    <header className={primaryClassName}>
      <Link to="/" className={customClassName("logo-and-name")}>
        <Icon
          icon={appLogo}
          className={customClassName("logo-and-name__logo")}
        />
        <h1 className={customClassName("logo-and-name__name")}>{appName}</h1>
      </Link>
      <div className={customClassName("search-and-login")}>
        <div className={customClassName("search-and-login__search")}>
          <span className="search-and-login__search__icon">
            <Icon icon="lucide:search" />
          </span>
          <input
            type="search"
            placeholder={searchInputPlaceholder}
            value={querySearch}
            onChange={handleSearchChange}
            className={customClassName("search-and-login__search__input")}
          />
          {querySearch && <SearchResults query={querySearch} />}
        </div>
        {!isLogged ? (
          <Link
            to={appRoutes["login"]}
            className={customClassName("search-and-login__login")}
          >
            Login
          </Link>
        ) : (
          <>
            <button
              className={customClassName("search-and-login__btn-create")}
              onClick={handleCreatePost}
            >
              <Icon icon="ps:plus-box" />
              <span
                className={customClassName(
                  "search-and-login__btn-create__text"
                )}
              >
                Create
              </span>
            </button>
            <Link
              to={`/p/${nick}`}
              className={customClassName("search-and-login__avatar")}
            >
              <img
                src={avatarImage}
                alt=""
                className={customClassName("search-and-login__avatar")}
              />
            </Link>
          </>
        )}
      </div>
      {createPost && <CreatePost handleQuit={handleCreatePost} />}
    </header>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
