import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "@iconify/react";
import noPicProfile from "../../images/no-pic-profile.jpg";
import config from "../../app_config.json";
import { logoutAction } from "../../redux/actions/userAction";
import "./styles/HeaderAside.css";

function HeaderAside({ token, accountDataREDUX, dispatch }) {
  const isLogged = token;
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
      <Link to={link}>
        <Icon icon={icon} />
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

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <aside className="header_aside">
      <div className="profile_header-menu">
        <Link className="info_header-menu" to={`/${nick}`}>
          <img src={avatarImage} alt="" />
          <div>
            <p>{maskLoading(name)}</p>
            <span>@{maskLoading(nick)}</span>
          </div>
        </Link>
        <div className="stats_header-menu">
          <Link to={`/${nick}/followers`} className="stats followers">
            <span className="title">Followers</span>
            <span className="count">{maskLoading(followersCount)}</span>
          </Link>
          <Link to={`/${nick}/following`} className="stats following">
            <span className="title">Following</span>
            <span className="count">{maskLoading(followingCount)}</span>
          </Link>
          <div className="stats posts">
            <span className="title">Posts</span>
            <span className="count">{maskLoading(postsCount)}</span>
          </div>
        </div>
      </div>
      <div className="header_aside-buttons">
        <ul>
          {isLogged && (
            <>
              <li className="header_nav-link">{linkAndIconTo("direct")}</li>
              <li className="header_nav-link">{linkAndIconTo("saved")}</li>
              <li className="header_nav-link">{buttonAndIconTo("notify")}</li>
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
            <Icon icon="teenyicons:logout-solid" />
          </button>
          <button className="header-menu_icon settings">
            <Icon icon="ph:gear" />
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
