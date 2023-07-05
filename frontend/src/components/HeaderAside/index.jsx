import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "@iconify/react";
import noPicProfile from "../../images/no-pic-profile.jpg";
import config from "../../app_config.json";
// import { logoutAction } from "../../redux/actions/userAction";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/HeaderAside.css";

function HeaderAside({ accountDataREDUX }) {
  // const { Header } = config["app.components"];
  const appRoutes = config["app.routes"];
  // const icons = Header["nav.icons"];

  const maskLoading = (key) => {
    if (!key && key !== 0) {
      return <Icon icon="eos-icons:three-dots-loading" />;
    } else {
      return key;
    }
  };

  const { name, nick, avatarUrl } = accountDataREDUX;

  const avatarImage = avatarUrl ?? noPicProfile;

  const location = useLocation();

  const isInPage = (page) => {
    let currentPage = "";
    if (location.pathname === "/") currentPage = "home";
    if (location.pathname === `/p/${nick}`) currentPage = "profile";
    if (location.pathname === "/direct") currentPage = "direct";
    if (location.pathname === "/saved") currentPage = "saved";
    if (location.pathname === "/notifications") currentPage = "notifications";
    if (location.pathname === "/settings") currentPage = "settings";
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

  // const handleLogout = () => {
  //   dispatch(logoutAction());
  // };

  const primaryClassName = "header-aside-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <aside className={primaryClassName}>
      <div className={customClassName("profile-area")}>
        <Link
          className={customClassName("profile-area__avatar-and-name-and-nick")}
          to={`/p/${nick}`}
        >
          <img
            src={avatarImage}
            alt=""
            className={customClassName(
              "profile-area__avatar-and-name-and-nick__avatar"
            )}
          />
          <div
            className={customClassName(
              "profile-area__avatar-and-name-and-nick__name-and-nick"
            )}
          >
            <p
              className={customClassName(
                "profile-area__avatar-and-name-and-nick__name-and-nick__name"
              )}
            >
              {maskLoading(name)}
            </p>
            <span
              className={customClassName(
                "profile-area__avatar-and-name-and-nick__name-and-nick__nick"
              )}
            >
              @{maskLoading(nick)}
            </span>
          </div>
        </Link>
      </div>
      <nav className={customClassName("aside__navigation")}>
        <ul className={customClassName("aside__navigation__ul")}>
          <li
            className={customClassName(
              `aside__navigation__ul__item${classPageSelected("home")}`
            )}
          >
            <Link to={appRoutes.home}>
              <Icon
                icon="majesticons:home-line"
                className={customClassName("aside__navigation__ul__item__icon")}
              />
              <span
                className={customClassName("aside__navigation__ul__item__text")}
              >
                Home
              </span>
            </Link>
          </li>
          <li
            className={customClassName(
              `aside__navigation__ul__item${classPageSelected("profile")}`
            )}
          >
            <Link to={`/p/${nick}`}>
              <Icon
                icon="iconamoon:profile-light"
                className={customClassName("aside__navigation__ul__item__icon")}
              />
              <span
                className={customClassName("aside__navigation__ul__item__text")}
              >
                Profile
              </span>
            </Link>
          </li>
          <li
            className={customClassName(
              `aside__navigation__ul__item${classPageSelected("direct")}`
            )}
          >
            <Link to={appRoutes.direct}>
              <Icon
                icon="ci:paper-plane"
                className={customClassName("aside__navigation__ul__item__icon")}
              />
              <span
                className={customClassName("aside__navigation__ul__item__text")}
              >
                Messages
              </span>
            </Link>
          </li>
          <li
            className={customClassName(
              `aside__navigation__ul__item${classPageSelected("saved")}`
            )}
          >
            <Link to={appRoutes.saved}>
              <Icon
                icon="material-symbols:collections-bookmark-outline"
                className={customClassName("aside__navigation__ul__item__icon")}
              />
              <span
                className={customClassName("aside__navigation__ul__item__text")}
              >
                Saved
              </span>
            </Link>
          </li>
          <li
            className={customClassName(
              `aside__navigation__ul__item${classPageSelected("notifications")}`
            )}
          >
            <Link to={appRoutes.notifications}>
              <Icon
                icon="fe:notice-push"
                className={customClassName("aside__navigation__ul__item__icon")}
              />
              <span
                className={customClassName("aside__navigation__ul__item__text")}
              >
                Updates
              </span>
            </Link>
          </li>
          <li
            className={customClassName(
              `aside__navigation__ul__item${classPageSelected("settings")}`
            )}
          >
            <Link to={appRoutes.settings}>
              <Icon
                icon="ri:settings-line"
                className={customClassName("aside__navigation__ul__item__icon")}
              />
              <span
                className={customClassName("aside__navigation__ul__item__text")}
              >
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      {/* <div className={customClassName("buttons")}>
        <div className={customClassName("buttons__primary-buttons")}>
          {linkAndIconTo("direct")}
          {linkAndIconTo("saved")}
          {buttonAndIconTo("notify")}
        </div>
        <div className={customClassName("buttons__secondary-buttons")}>
          <button
            onClick={handleLogout}
            className={customClassName(
              "buttons__secondary-buttons__button",
              null,
              "logout"
            )}
          >
            <Icon
              icon="teenyicons:logout-solid"
              className={customClassName(
                "buttons__secondary-buttons__button__icon"
              )}
            />
          </button>
          <button
            className={customClassName(
              "buttons__secondary-buttons__button",
              null,
              "settings"
            )}
          >
            <Icon
              icon="ri:settings-line"
              className={customClassName(
                "buttons__secondary-buttons__button__icon"
              )}
            />
          </button>
        </div>
      </div> */}
    </aside>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  accountDataREDUX: state.userReducer.accountData,
});

export default connect(mapStateToProps)(HeaderAside);

HeaderAside.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
