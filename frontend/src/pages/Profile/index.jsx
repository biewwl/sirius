import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  followOrUnfollowUser,
  getIBlockUser,
  getLoggedData,
  getProfileData,
  isFollowing,
} from "../../helpers/fetch";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { verifiedType } from "../../helpers";
import SectionTitle from "../../components/SectionTitle";
import Header from "../../components/Header";
import ProfileSkeleton from "./skeleton";
import ProfileConfigMenu from "../../components/ProfileConfigMenu";
import { setAccountDataAction } from "../../redux/actions/userAction";
import "./styles/Profile.css";
import "./styles/Profile-mobile.css";

function Profile({ token, accountDataREDUX, dispatch }) {
  // Component State
  const [profileData, setProfileData] = useState({});
  const [loggedIsBlocked, setLoggedIsBlocked] = useState(false);
  const [profileOwnerIsBlocked, setProfileOwnerIsBlocked] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [loggedFollowUserProfile, setLoggedFollowUserProfile] = useState(false);
  const [openConfigMenu, setOpenConfigMenu] = useState(false);
  const [loading, setLoading] = useState(true);

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
  const inLoggedProfile = accountDataREDUX.nick === profileNick;

  // Update Data
  const updateLoggedData = async () => {
    const userLoggedData = await getLoggedData(token);
    dispatch(setAccountDataAction(userLoggedData));
  };

  // Fetch data
  const getProfileOwnerIsBlocked = useCallback(async () => {
    const userLoggedBlockUserProfile = await getIBlockUser(token, profileNick);
    setProfileOwnerIsBlocked(userLoggedBlockUserProfile);
  });

  const getLoggedFollowProfileOwner = useCallback(async () => {
    const userLoggedFollowUserProfile = await isFollowing(
      token,
      profileNick,
      "user"
    );
    setLoggedFollowUserProfile(userLoggedFollowUserProfile);
  });

  const fetchProfileData = useCallback(async () => {
    const data = await getProfileData(token, profileNick);
    const { error } = data;
    if (error) {
      if (error === "blocked") {
        return setLoggedIsBlocked(true);
      }
      if (error === "userInexistent") {
        return setUserNotFound(true);
      }
    }
    setLoggedIsBlocked(false);
    setProfileData(data);
  });

  const fetchCompleteProfileData = useCallback(async () => {
    await fetchProfileData();
    if (isLogged && !inLoggedProfile) {
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

  // ConfigMenu Props

  const profileMenuProps = {
    handleOpenConfig,
    profileOwnerIsBlocked,
    fetchCompleteProfileData,
    updateLoggedData,
    loggedIsBlocked,
    openConfigMenu,
    setOpenConfigMenu,
  };

  // Components render restrictions
  const isLoggedNoBlocksNotInLoggedProfile =
    !loggedIsBlocked &&
    isLogged &&
    accountDataREDUX.nick !== nick &&
    !profileOwnerIsBlocked;
  const isLoggedNotInLoggedProfile = isLogged && accountDataREDUX.nick !== nick;

  // UseEffects
  useEffect(() => {
    const setup = async () => {
      setLoading(true);
      setProfileOwnerIsBlocked(false);
      await fetchCompleteProfileData();
      setLoading(false);
    };
    setup();
  }, [profileNick]);

  const defineSkeleton = () => {
    if (loading || userNotFound) {
      return <ProfileSkeleton />;
    } else {
      return (
        <ProfileSkeleton isBlocked={true} profileMenuProps={profileMenuProps} />
      );
    }
  };
  const isSkeleton = loading || loggedIsBlocked || userNotFound;

  return (
    <div className="div-page">
      <Header />
      {isSkeleton ? (
        defineSkeleton()
      ) : (
        <>
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
                <div className="profile_actions">
                  {isLoggedNoBlocksNotInLoggedProfile && (
                    <>
                      <Link
                        to={`${direct}/${nick}`}
                        className="profile_action-btn"
                      >
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
                {!loggedIsBlocked && (
                  <>
                    <div className="stats_profile">
                      <Link to={`/${nick}/followers`} className="stats follows">
                        <span className="title">Followers</span>
                        <span className="count">{followersCount}</span>
                      </Link>
                      <Link
                        to={`/${nick}/following`}
                        className="stats following"
                      >
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
                <ProfileConfigMenu profileMenuProps={profileMenuProps} />
              )}
            </main>
          </div>
        </>
      )}
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
