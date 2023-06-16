import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "@iconify/react";
import noPicProfile from "../../images/no-pic-profile.jpg";
import config from "../../app_config.json";
import { logoutAction } from "../../redux/actions/userAction";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/HeaderAside.css";

function HeaderAside({ accountDataREDUX, dispatch }) {
  const { Header } = config["app.components"];
  const appRoutes = config["app.routes"];
  const icons = Header["nav.icons"];

  const maskLoading = (key) => {
    if (!key && key !== 0) {
      return <Icon icon="eos-icons:three-dots-loading" />;
    } else {
      return key;
    }
  };

  const { name, nick, avatarUrl, followersCount, followingCount, postsCount } =
    accountDataREDUX;

  const avatarImage = avatarUrl ?? noPicProfile;

  const linkAndIconTo = (path) => {
    const icon = icons[path];
    const link = appRoutes[path];
    return (
      <Link
        to={link}
        className={customClassName("buttons__primary-buttons__button")}
      >
        <Icon
          icon={icon}
          className={customClassName("buttons__primary-buttons__button__icon")}
        />
      </Link>
    );
  };

  const buttonAndIconTo = (component, callback) => {
    const icon = icons[component];
    return (
      <button
        onClick={callback}
        className={customClassName("buttons__primary-buttons__button")}
      >
        <Icon
          icon={icon}
          className={customClassName("buttons__primary-buttons__button__icon")}
        />
      </button>
    );
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

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
        <div className={customClassName("profile-area__stats-area")}>
          <Link
            to={`/${nick}/followers`}
            className={customClassName("profile-area__stats-area__stats")}
          >
            <span
              className={customClassName(
                "profile-area__stats-area__stats__title"
              )}
            >
              Followers
            </span>
            <span
              className={customClassName(
                "profile-area__stats-area__stats__count"
              )}
            >
              {maskLoading(followersCount)}
            </span>
          </Link>
          <Link
            to={`/${nick}/following`}
            className={customClassName("profile-area__stats-area__stats")}
          >
            <span
              className={customClassName(
                "profile-area__stats-area__stats__title"
              )}
            >
              Following
            </span>
            <span
              className={customClassName(
                "profile-area__stats-area__stats__count"
              )}
            >
              {maskLoading(followingCount)}
            </span>
          </Link>
          <div className={customClassName("profile-area__stats-area__stats")}>
            <span
              className={customClassName(
                "profile-area__stats-area__stats__title"
              )}
            >
              Posts
            </span>
            <span
              className={customClassName(
                "profile-area__stats-area__stats__count"
              )}
            >
              {maskLoading(postsCount)}
            </span>
          </div>
        </div>
      </div>
      <div className={customClassName("buttons")}>
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
              icon="ph:gear"
              className={customClassName(
                "buttons__secondary-buttons__button__icon"
              )}
            />
          </button>
        </div>
      </div>
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
