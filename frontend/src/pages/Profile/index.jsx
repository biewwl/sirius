import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import PropTypes from "prop-types";
import SectionTitle from "../../components/SectionTitle";
import { getProfileData } from "../../helpers/fetch";
import { Link, useParams } from "react-router-dom";
import avatarBlocked from "../../images/avatar-blocked.png";
import coverBlocked from "../../images/cover-blocked.png";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";

import "./styles/Profile.css";

function Profile({ token }) {
  const [profileData, setProfileData] = useState({});
  const [isBlocked, setIsBlocked] = useState(false);
  const { profile: profileNick } = useParams();

  const { Profile } = config["app.components"];
  const icons = Profile["actions.icons"];

  const { direct } = config["app.routes"];

  const blockedView = {
    name: "blocked by",
    nick: profileNick,
    coverUrl: coverBlocked,
    avatarUrl: avatarBlocked,
    followersCount: "--",
    followingCount: "--",
  };

  const { name, nick, coverUrl, avatarUrl, followersCount, followingCount } =
    profileData;

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getProfileData(token, profileNick);
      const { error } = data;
      if (error) {
        setIsBlocked(true);
        return setProfileData(blockedView);
      }
      setIsBlocked(false);
      setProfileData(data);
    };
    fetchProfileData();
  }, [profileNick]);

  return (
    <div className="div-page">
      <Header />
      <div className="div-page-content profile">
        <main className="page_profile">
          <div className="cover">
            <img src={coverUrl} alt="" />
          </div>
          <section className="profile_content">
            <div className="profile_avatar-and-user">
              <img src={avatarUrl} alt="" />
              <span className="name">{name}</span>
              <span className="nick">@{nick}</span>
            </div>
            {!isBlocked && (
              <div className="profile_actions direct">
                <Link to={`${direct}/${nick}`} className="profile_action-btn">
                  <Icon icon={icons["direct"]} />
                  <span>Direct</span>
                </Link>
                <button className="profile_action-btn follow">
                  <Icon icon={icons["follow"]} />
                  <span>Follow</span>
                </button>
                <button className="profile_action-btn config">
                  <Icon icon={icons["config"]} />
                </button>
              </div>
            )}
            <div className="stats_profile">
              <div className="stats follows">
                <span className="title">Followers</span>
                <span className="count">{followersCount}</span>
              </div>
              <div className="stats following">
                <span className="title">Following</span>
                <span className="count">{followingCount}</span>
              </div>
              <div className="stats posts">
                <span className="title">Posts</span>
                <span className="count">0</span>
              </div>
            </div>
            <div className="profile_posts">
              <SectionTitle title="Posts" icon="gridicons:posts" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Profile);

Profile.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
