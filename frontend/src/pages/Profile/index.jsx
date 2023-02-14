import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import PropTypes from "prop-types";
import SectionTitle from "../../components/SectionTitle";
import { followUser, getFollowUser, getProfileData } from "../../helpers/fetch";
import { Link, useParams } from "react-router-dom";
import avatarBlocked from "../../images/avatar-blocked.png";
import coverBlocked from "../../images/cover-blocked.png";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import "./styles/Profile.css";

function Profile({ token, accountDataREDUX }) {
  const [profileData, setProfileData] = useState({});
  const [isBlocked, setIsBlocked] = useState(false);
  const { profile: profileNick } = useParams();
  const isLogged = token;

  const [followLoggedUser, setFollowLoggedUser] = useState(false);

  const { Profile } = config["app.components"];
  const icons = Profile["actions.icons"];

  const actionFollow = followLoggedUser ? "unfollow" : "follow";

  const { direct } = config["app.routes"];

  const blockedView = {
    name: "blocked by",
    nick: profileNick,
    coverUrl: coverBlocked,
    avatarUrl: avatarBlocked,
    followersCount: "--",
    followingCount: "--",
    accountVerified: "none"
  };

  const {
    name,
    nick,
    coverUrl,
    avatarUrl,
    followersCount,
    followingCount,
    accountVerified,
  } = profileData;

  const fetchProfileData = useCallback(async () => {
    const data = await getProfileData(token, profileNick);
    const { error } = data;
    if (error) {
      setIsBlocked(true);
      return setProfileData(blockedView);
    }
    if (isLogged) {
      const getFollowUserLogged = await getFollowUser(token, profileNick);
      setFollowLoggedUser(getFollowUserLogged);
    }

    setIsBlocked(false);
    setProfileData(data);
  });

  useEffect(() => {
    fetchProfileData();
  }, [profileNick]);

  const handleFollowUser = async () => {
    await followUser(token, profileNick, actionFollow);
    fetchProfileData();
  };

  const isVerified = accountVerified !== "none";

  const renderActions =
    !isBlocked && isLogged && accountDataREDUX.nick !== nick;

  const textVerified = {
    identity: "has verified the identity",
    public_figure: "belongs to a public figure",
  };

  const defineTextVerified = `This account ${textVerified[accountVerified]}`;

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
              <span className="name">
                <span>{name}</span>
                {isVerified && (
                  <div title={defineTextVerified}>
                    <Icon
                      icon="mdi:verified"
                      className={accountVerified}
                      title="test"
                    />
                  </div>
                )}
              </span>
              <span className="nick">@{nick}</span>
            </div>
            {renderActions && (
              <div className="profile_actions direct">
                <Link to={`${direct}/${nick}`} className="profile_action-btn">
                  <Icon icon={icons["direct"]} />
                  <span>Direct</span>
                </Link>
                <button
                  className={`profile_action-btn ${actionFollow}`}
                  onClick={handleFollowUser}
                >
                  <Icon icon={icons[actionFollow]} />
                  <span>{actionFollow}</span>
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
