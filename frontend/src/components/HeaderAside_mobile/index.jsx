import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/userAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLoggedData } from "../../helpers/fetch";
import { Icon } from "@iconify/react";
import noPicProfile from "../../images/no-pic-profile.jpg";
import "./styles/HeaderAside.css";
import "./styles/HeaderAside_mobile.css";

function HeaderAside_mobile({ dispatch, token, accountDataREDUX }) {
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

  return (
    <aside className="header-aside-menu">
      <div className="profile_header-aside-menu">
        <Link className="info_header-aside-menu" to={`/${nick}`}>
          <div>
            <p>{maskLoading(name)}</p>
            <span>@{maskLoading(nick)}</span>
          </div>
          <img src={avatarImage} alt="" />
        </Link>
        <div className="stats_header-aside-menu">
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
      <button onClick={handleLogout} className="header-aside-menu_icon logout">
        <span>Logout</span>
        <Icon icon="teenyicons:logout-solid" />
      </button>
      <button className="header-aside-menu_icon settings">
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

export default connect(mapStateToProps)(HeaderAside_mobile);

HeaderAside_mobile.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
