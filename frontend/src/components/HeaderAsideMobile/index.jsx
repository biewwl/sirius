import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/userAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLoggedData } from "../../helpers/fetch";
import { Icon } from "@iconify/react";
import noPicProfile from "../../images/no-pic-profile.jpg";
import "./styles/HeaderAsideMobile.css";
import generateClassName from "../../helpers/generateClassBEM";

function HeaderAsideMobile({ dispatch, token, accountDataREDUX }) {
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const [accountData, setAccountData] = useState(accountDataREDUX);

  const maskLoading = (key) => {
    if (!key && key !== 0) {
      return <Icon icon="eos-icons:three-dots-loading" />;
    } else {
      return key;
    }
  };

  const { name, nick, avatarUrl, followersCount, followingCount, postsCount } =
    accountData;

  const avatarImage = avatarUrl ?? noPicProfile;

  useEffect(() => {
    const getMenuStats = async () => {
      const responseAccountData = await getLoggedData(token);
      setAccountData(responseAccountData);
    };
    getMenuStats();
  }, []);

  const primaryClassName = "header-aside-mobile-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <aside className={primaryClassName}>
      <div className={customClassName("profile-area")}>
        <Link
          className={customClassName("profile-area__name-and-nick-and-avatar")}
          to={`/${nick}`}
        >
          <div
            className={customClassName(
              "profile-area__name-and-nick-and-avatar__name-and-nick"
            )}
          >
            <p
              className={customClassName(
                "profile-area__name-and-nick-and-avatar__name-and-nick__name"
              )}
            >
              {maskLoading(name)}
            </p>
            <span
              className={customClassName(
                "profile-area__name-and-nick-and-avatar__name-and-nick__nick"
              )}
            >
              @{maskLoading(nick)}
            </span>
          </div>
          <img
            src={avatarImage}
            alt=""
            className={customClassName(
              "profile-area__name-and-nick-and-avatar__avatar"
            )}
          />
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
      <button onClick={handleLogout} className={customClassName("logout-btn")}>
        <span>Logout</span>
        <Icon icon="teenyicons:logout-solid" />
      </button>
      <button className={customClassName("settings-btn")}>
        <span>Settings</span>
        <Icon icon="ph:gear" />
      </button>
    </aside>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  accountDataREDUX: state.userReducer.accountData,
});

export default connect(mapStateToProps)(HeaderAsideMobile);

HeaderAsideMobile.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
