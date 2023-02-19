import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPosts, getIBlockUser, getProfileData } from "../../helpers/fetch";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { verifiedType } from "../../helpers";
import SectionTitle from "../../components/SectionTitle";
import HeaderAndAside from "../../components/HeaderAndAside";
import ProfileSkeleton from "./skeleton";
import ProfileConfigMenu from "../../components/ProfileConfigMenu";
import Posts from "../../components/Posts";
import ActionsProfile from "../../components/ActionsProfile";
import "./styles/Profile.css";
import "./styles/Profile-mobile.css";
import BlockedWarning from "../../components/BlockedWarning";

function Profile({ token, accountDataREDUX }) {
  // Component State
  const [profileData, setProfileData] = useState({});
  const [userPosts, setUsersPosts] = useState([]);
  const [loggedIsBlocked, setLoggedIsBlocked] = useState(false);
  const [profileOwnerIsBlocked, setProfileOwnerIsBlocked] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [openConfigMenu, setOpenConfigMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  // Component Params
  const { profile: nick } = useParams();

  // Component configs
  const { Profile } = config["app.components"];
  const icons = Profile["actions.icons"];

  // Variables
  const isLogged = token;
  const actionBlock = profileOwnerIsBlocked ? "unblock" : "block";
  const {
    name,
    coverUrl,
    avatarUrl,
    followersCount,
    followingCount,
    accountVerified,
  } = profileData;
  const isVerified = accountVerified !== "none";
  const { text, icon } = verifiedType(accountVerified);
  const inLoggedProfile = accountDataREDUX.nick === nick;

  // Fetch data
  const getProfileOwnerIsBlocked = useCallback(async () => {
    const userLoggedBlockUserProfile = await getIBlockUser(token, nick);
    setProfileOwnerIsBlocked(userLoggedBlockUserProfile);
  });

  const fetchProfileData = useCallback(async () => {
    const data = await getProfileData(token, nick);
    const { error } = data;
    if (isLogged && !inLoggedProfile) {
      await getProfileOwnerIsBlocked();
    }
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

  // Handles
  const handleOpenConfig = () => {
    setOpenConfigMenu(!openConfigMenu);
  };

  // ConfigMenu Props
  const profileMenuProps = {
    handleOpenConfig,
    profileOwnerIsBlocked,
    fetchProfileData,
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
  const isBlocked = isLogged && profileOwnerIsBlocked;

  // UseEffects
  useEffect(() => {
    const setup = async () => {
      setLoading(true);
      setProfileOwnerIsBlocked(false);
      setUserNotFound(false);
      await fetchProfileData();
      const posts = await fetchPosts(token, nick);
      setUsersPosts(posts);
      setLoading(false);
    };
    setup();
  }, [nick]);

  const isSkeleton = loading || loggedIsBlocked || userNotFound;

  return (
    <div className="div-page">
      <HeaderAndAside />
      {isSkeleton ? (
        <ProfileSkeleton
          isBlocked={loggedIsBlocked}
          profileMenuProps={profileMenuProps}
        />
      ) : (
        <>
          <div className={`div-page-content profile ${actionBlock}`}>
            {isBlocked && <BlockedWarning />}
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
                    <ActionsProfile fetchProfileData={fetchProfileData} />
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
                      <Link
                        to={`/${nick}/followers`}
                        className="stats followers"
                      >
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
                      <Posts posts={userPosts} />
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
