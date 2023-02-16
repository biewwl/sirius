import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  blockOrUnblockUser,
  followOrUnfollowUser,
  getIBlockUser,
  getLoggedData,
  getProfileData,
  isFollowing,
} from "../../helpers/fetch";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { userBlockedData, userNotFoundData } from "../../mocks/userData";
import { verifiedType } from "../../helpers";
import SectionTitle from "../../components/SectionTitle";
import Header from "../../components/Header";
import { setAccountDataAction } from "../../redux/actions/userAction";
import "./styles/Profile.css";

function Profile({ token, accountDataREDUX, dispatch }) {
  // Component State
  const [profileData, setProfileData] = useState({});
  const [loggedIsBlocked, setLoggedIsBlocked] = useState(false);
  const [profileOwnerIsBlocked, setProfileOwnerIsBlocked] = useState(false);
  const [loggedFollowUserProfile, setLoggedFollowUserProfile] = useState(false);
  const [openConfigMenu, setOpenConfigMenu] = useState(false);

  // Component Params
  const { profile: profileNick } = useParams();

  // Component configs
  const { Profile } = config["app.components"];
  const icons = Profile["actions.icons"];
  const { direct } = config["app.routes"];

  // Variables
  const isLogged = token;
  const actionFollow = loggedFollowUserProfile ? "unfollow" : "follow";
  const actionBlock = profileOwnerIsBlocked ? "unblock" : "block";
  const {
    name,
    nick,
    coverUrl,
    avatarUrl,
    followersCount,
    followingCount,
    accountVerified,
  } = profileData;
  const isVerified = accountVerified !== "none";
  const { text, icon } = verifiedType(accountVerified);

  // Update Data
  const updateLoggedData = async () => {
    const userLoggedData = await getLoggedData(token);
    dispatch(setAccountDataAction(userLoggedData));
  };

  // Fetch data
  const getProfileOwnerIsBlocked = useCallback(async () => {
    const iBLock = await getIBlockUser(token, profileNick);
    setProfileOwnerIsBlocked(iBLock);
  });

  const getLoggedFollowProfileOwner = useCallback(async () => {
    const getFollowUserLogged = await isFollowing(token, profileNick, "user");
    setLoggedFollowUserProfile(getFollowUserLogged);
  });

  const fetchProfileData = useCallback(async () => {
    const data = await getProfileData(token, profileNick);
    const { error } = data;
    if (error) {
      if (error === "blocked") {
        setLoggedIsBlocked(true);
        return setProfileData(userBlockedData(profileNick));
      }
      if (error === "userInexistent") {
        return setProfileData(userNotFoundData(profileNick));
      }
    }
    setLoggedIsBlocked(false);
    setProfileData(data);
  });

  const fetchCompleteProfileData = useCallback(async () => {
    await fetchProfileData();
    if (isLogged) {
      await getProfileOwnerIsBlocked();
      await getLoggedFollowProfileOwner();
    }
  });

  // Handles
  const handleOpenConfig = () => {
    setOpenConfigMenu(!openConfigMenu);
  };

  const handleFollowUser = async () => {
    await followOrUnfollowUser(token, profileNick, actionFollow);
    fetchCompleteProfileData();
    updateLoggedData();
  };

  const handleBlock = async () => {
    await blockOrUnblockUser(token, nick, actionBlock);
    fetchCompleteProfileData();
    setOpenConfigMenu(false);
    updateLoggedData();
  };

  // Components render restrictions
  const isLoggedNoBlocksNotInLoggedProfile =
    !loggedIsBlocked &&
    isLogged &&
    accountDataREDUX.nick !== nick &&
    !profileOwnerIsBlocked;
  const isLoggedNotInLoggedProfile = isLogged && accountDataREDUX.nick !== nick;

  const isLoggedAndLoggedProfileIsBlocked = isLogged && loggedIsBlocked;

  // UseEffects
  useEffect(() => {
    fetchCompleteProfileData();
  }, [profileNick]);

  return (
    <div className="div-page">
      <Header />
      {profileOwnerIsBlocked && (
        <div className="profile_blocked-feedback">
          <Icon icon="fluent:presence-blocked-20-regular" />
          <span>
            <strong>{profileNick}</strong> is blocked!
          </span>
        </div>
      )}
      <div className={`div-page-content profile ${actionBlock}`}>
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
                  <div title={text}>
                    <Icon
                      icon={icon}
                      className={accountVerified}
                      title="test"
                    />
                  </div>
                )}
              </span>
              <span className="nick">@{nick}</span>
            </div>
            <div className="profile_actions direct">
              {isLoggedNoBlocksNotInLoggedProfile && (
                <>
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
                </>
              )}
              {isLoggedNotInLoggedProfile && (
                <button
                  className="profile_action-btn config"
                  onClick={handleOpenConfig}
                >
                  <Icon icon={icons["config"]} />
                </button>
              )}
            </div>
            {!isLoggedAndLoggedProfileIsBlocked && (
              <>
                <div className="stats_profile">
                  <Link to={`/${nick}/followers`} className="stats follows">
                    <span className="title">Followers</span>
                    <span className="count">{followersCount}</span>
                  </Link>
                  <Link to={`/${nick}/following`} className="stats following">
                    <span className="title">Following</span>
                    <span className="count">{followingCount}</span>
                  </Link>
                  <div className="stats posts">
                    <span className="title">Posts</span>
                    <span className="count">0</span>
                  </div>
                </div>
                <div className="profile_posts">
                  <SectionTitle title="Posts" icon="gridicons:posts" />
                </div>
              </>
            )}
          </section>
          {openConfigMenu && (
            <div className="profile-config">
              <section>
                <button
                  onClick={handleBlock}
                  className={profileOwnerIsBlocked ? "unblock" : "block"}
                >
                  {profileOwnerIsBlocked ? (
                    <>
                      <Icon icon="material-symbols:lock-open-outline" />
                      <span>Unblock</span>
                    </>
                  ) : (
                    <>
                      <Icon icon="material-symbols:lock-outline" />
                      <span>Block</span>
                    </>
                  )}
                </button>
                <button>
                  <Icon icon={icons["direct"]} />
                  <span>Share Profile</span>
                </button>
              </section>
              <button onClick={handleOpenConfig} className="cancel">
                Cancel
              </button>
            </div>
          )}
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
