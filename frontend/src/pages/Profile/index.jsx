import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPosts, getIBlockUser, getProfileData } from "../../helpers/fetch";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { verifiedType } from "../../helpers";
// import SectionTitle from "../../components/SectionTitle";
import HeaderAndAside from "../../components/HeaderAndAside";
import ProfileSkeleton from "./skeleton";
import ProfileConfigMenu from "../../components/ProfileConfigMenu";
import Posts from "../../components/Posts";
import ActionsProfile from "../../components/ActionsProfile";
import BlockedWarning from "../../components/BlockedWarning";
import PostsGrid from "../../components/PostsGrid";
import generateClassName from "../../helpers/generateClassBEM";
import UserAvatarStory from "../../components/UserAvatarStory";
import SectionTitle from "../../components/SectionTitle";
import AsideStories from "../../components/AsideStories";
import "./styles/Profile.css";
import "./styles/Profile-mobile.css";

function Profile({ token, accountDataREDUX }) {
  // Component State
  const [profileData, setProfileData] = useState({});
  const [userPosts, setUsersPosts] = useState([]);
  const [loggedIsBlocked, setLoggedIsBlocked] = useState(false);
  const [profileOwnerIsBlocked, setProfileOwnerIsBlocked] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [openConfigMenu, setOpenConfigMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gridView, setGridView] = useState(false);

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
    postsCount,
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

  const handleChangeView = () => {
    setGridView(!gridView);
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

  const primaryClassName = "profile-page";
  const customClassName = generateClassName(primaryClassName);

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
          <main className={`${primaryClassName} ${actionBlock}`}>
            {isBlocked && <BlockedWarning />}
            <div className={customClassName("cover")}>
              <img
                src={coverUrl}
                alt=""
                className={customClassName("cover__image")}
              />
            </div>
            <section className={customClassName("content")}>
              <div className={customClassName("content__avatar-and-user")}>
                <UserAvatarStory
                  avatarUrl={avatarUrl}
                  size="150"
                  nick={nick}
                  borderWidth="6"
                />
                <span
                  className={customClassName(
                    "content__avatar-and-user__name-area"
                  )}
                >
                  <span
                    className={customClassName(
                      "content__avatar-and-user__name-area__name"
                    )}
                  >
                    {name}
                  </span>
                  {isVerified && (
                    <div
                      title={text}
                      className={customClassName(
                        "content__avatar-and-user__name-area__icon-verified"
                      )}
                    >
                      <Icon
                        icon={icon}
                        className={`verified-${accountVerified}`}
                        title="test"
                      />
                    </div>
                  )}
                </span>
                <span
                  className={customClassName("content__avatar-and-user__nick")}
                >
                  @{nick}
                </span>
              </div>
              {!loggedIsBlocked && (
                <div className={customClassName("content__stats-and-posts")}>
                  <div className={customClassName("content__actions")}>
                    {isLoggedNoBlocksNotInLoggedProfile && (
                      <ActionsProfile
                        fetchProfileData={fetchProfileData}
                        primaryClassName={customClassName("content__actions")}
                      />
                    )}
                    {isLoggedNotInLoggedProfile && (
                      <button
                        className={customClassName(
                          "content__actions__config-btn"
                        )}
                        onClick={handleOpenConfig}
                      >
                        <Icon icon={icons["config"]} />
                      </button>
                    )}
                  </div>
                  <div
                    className={customClassName(
                      "content__stats-and-posts__stats-area"
                    )}
                  >
                    <Link
                      to={`/${nick}/followers`}
                      className={customClassName(
                        "content__stats-and-posts__stats-area__stats"
                      )}
                    >
                      <span
                        className={customClassName(
                          "content__stats-and-posts__stats-area__stats__title"
                        )}
                      >
                        Followers
                      </span>
                      <span
                        className={customClassName(
                          "content__stats-and-posts__stats-area__stats__count"
                        )}
                      >
                        {followersCount}
                      </span>
                    </Link>
                    <Link
                      to={`/${nick}/following`}
                      className={customClassName(
                        "content__stats-and-posts__stats-area__stats"
                      )}
                    >
                      <span
                        className={customClassName(
                          "content__stats-and-posts__stats-area__stats__title"
                        )}
                      >
                        Following
                      </span>
                      <span
                        className={customClassName(
                          "content__stats-and-posts__stats-area__stats__count"
                        )}
                      >
                        {followingCount}
                      </span>
                    </Link>
                    <div
                      className={customClassName(
                        "content__stats-and-posts__stats-area__stats"
                      )}
                    >
                      <span
                        className={customClassName(
                          "content__stats-and-posts__stats-area__stats__title"
                        )}
                      >
                        Posts
                      </span>
                      <span
                        className={customClassName(
                          "content__stats-and-posts__stats-area__stats__count"
                        )}
                      >
                        {postsCount}
                      </span>
                    </div>
                  </div>
                  <SectionTitle
                    onClickIcon={handleChangeView}
                    icon={
                      gridView
                        ? "solar:posts-carousel-vertical-line-duotone"
                        : "eva:grid-fill"
                    }
                  />
                  <div
                    className={customClassName(
                      "content__stats-and-posts__posts"
                    )}
                  >
                    {!gridView && <Posts posts={userPosts} />}
                    {gridView && <PostsGrid posts={userPosts} />}
                  </div>
                </div>
              )}
            </section>
            {openConfigMenu && (
              <ProfileConfigMenu profileMenuProps={profileMenuProps} />
            )}
          </main>
        </>
      )}
      <AsideStories />
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
