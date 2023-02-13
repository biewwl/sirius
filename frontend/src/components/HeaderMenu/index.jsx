import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/userAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAccountData } from "../../helpers/fetch";
import { Icon } from "@iconify/react";
import noPicProfile from "../../images/no-pic-profile.jpg";
import "./styles/HeaderMenu.css";
import "./styles/HeaderMenu-mobile.css";

function HeaderMenu({ dispatch, token }) {
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const [accountData, setAccountData] = useState({
    name: "loading",
    countFollowers: "loading",
    countFollowing: "loading",
    countPosts: 0,
  });

  const maskLoading = (key) => {
    if (key === "loading") {
      return <Icon icon="eos-icons:three-dots-loading" />;
    } else {
      return key;
    }
  };

  const { name, avatarUrl, countFollowers, countFollowing, countPosts } =
    accountData;

  const avatarImage = avatarUrl ?? noPicProfile;

  useEffect(() => {
    const getMenuStats = async () => {
      const responseAccountData = await getAccountData(token);
      const { followers, following } = responseAccountData;
      setAccountData({
        ...responseAccountData,
        countFollowers: followers.length,
        countFollowing: following.length,
        countPosts: 0,
      });
    };
    getMenuStats();
  }, []);

  return (
    <aside className="header-menu">
      <div className="profile_header-menu">
        <Link className="info_header-menu" to={"biewwl"}>
          <span>{maskLoading(name)}</span>
          <img src={avatarImage} alt="" />
        </Link>
        <div className="stats_header-menu">
          <div className="stats follows">
            <span className="title">Followers</span>
            <span className="count">{maskLoading(countFollowers)}</span>
          </div>
          <div className="stats following">
            <span className="title">Following</span>
            <span className="count">{maskLoading(countFollowing)}</span>
          </div>
          <div className="stats posts">
            <span className="title">Posts</span>
            <span className="count">{maskLoading(countPosts)}</span>
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
});

export default connect(mapStateToProps)(HeaderMenu);

HeaderMenu.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
};
