import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/userAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLoggedData } from "../../helpers/fetch";
import { Icon } from "@iconify/react";
import noPicProfile from "../../images/no-pic-profile.jpg";
import "./styles/HeaderMenu.css";
import "./styles/HeaderMenu-mobile.css";

function HeaderMenu({ dispatch, token, accountDataREDUX }) {
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
  }, [token]);

  return (
    <aside className="header-menu">
      <div className="profile_header-menu">
        <Link className="info_header-menu" to={`/${nick}`}>
          <div>
            <p>{maskLoading(name)}</p>
            <span>@{maskLoading(nick)}</span>
          </div>
          <img src={avatarImage} alt="" />
        </Link>
        <div className="stats_header-menu">
          <div className="stats follows">
            <span className="title">Followers</span>
            <span className="count">{maskLoading(followersCount)}</span>
          </div>
          <div className="stats following">
            <span className="title">Following</span>
            <span className="count">{maskLoading(followingCount)}</span>
          </div>
          <div className="stats posts">
            <span className="title">Posts</span>
            <span className="count">{maskLoading(postsCount)}</span>
          </div>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
      <button>Settings</button>
    </aside>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  accountDataREDUX: state.userReducer.accountData,
});

export default connect(mapStateToProps)(HeaderMenu);

HeaderMenu.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
