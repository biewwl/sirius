import React from "react";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/userAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles/HeaderMenu.css";
import "./styles/HeaderMenu-mobile.css";

function HeaderMenu({ dispatch }) {
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <aside className="header-menu">
      <div className="profile_header-menu">
        <Link className="info_header-menu" to={"biewwl"}>
          <span>Gabriel</span>
          <img
            src="https://i.ibb.co/SPv6cTY/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg"
            alt=""
          />
        </Link>
        <div className="stats_header-menu">
          <div className="stats follows">
            <span className="title">Follows</span>
            <span className="count">1M</span>
          </div>
          <div className="stats following">
            <span className="title">Following</span>
            <span className="count">100</span>
          </div>
          <div className="stats posts">
            <span className="title">Posts</span>
            <span className="count">15</span>
          </div>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
      <button>Settings</button>
    </aside>
  );
}

export default connect()(HeaderMenu);

HeaderMenu.propTypes = {
  dispatch: PropTypes.func,
};
