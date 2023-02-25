import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { checkBlock, dataProfile, listPosts } from "../../helpers/fetch";
import config from "../../app_config.json";
import { Icon } from "@iconify/react";
import { verifiedType } from "../../helpers";
import SectionTitle from "../../components/SectionTitle";
import HeaderAndAside from "../../components/HeaderAndAside";
import ProfileSkeleton from "./skeleton";
import ProfileConfigMenu from "../../components/ProfileConfigMenu";
import Posts from "../../components/Posts";
import ActionsProfile from "../../components/ActionsProfile";
import BlockedWarning from "../../components/BlockedWarning";
import PostsGrid from "../../components/PostsGrid";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/Profile.css";
import "./styles/Profile-mobile.css";

function Profile({ token, accountDataREDUX }) {
  // Component State
  const [profileData, setProfileData] = useState({});
  const [profilePosts, setProfilePosts] = useState([]);

  const [requesterBlocked, setRequesterBlocked] = useState(false);
  const [requestedBlocked, setRequestedBlocked] = useState(false);

  const [requestedNotFound, setRequestedNotFound] = useState(false);

  const [openConfigMenu, setOpenConfigMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gridView, setGridView] = useState(false);

  // Component Params
  const params = useParams();
  const { profile: nick } = params;

  // Component configs
  const { Profile } = config["app.components"];
  const icons = Profile["actions.icons"];

  // Variables
  const isLogged = token;
  const actionBlock = requestedBlocked ? "unblock" : "block";
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
  const getRequestedBlocked = useCallback(async () => {
    const isRequestedBlocked = await checkBlock(token, nick);
    setRequestedBlocked(isRequestedBlocked);
  });

  const fetchProfileData = useCallback(async () => {
    const data = await dataProfile({ token, nick });

    if (isLogged && !inLoggedProfile) getRequestedBlocked();

    if (typeof data === "number") {
      if (data === 403) return setRequesterBlocked(true);
      if (data === 404) return setRequestedNotFound(true);
    }

    setProfileData(data);

    const posts = await listPosts(token, nick);
    setProfilePosts(posts);
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
    requestedBlocked,
    fetchProfileData,
    requesterBlocked,
    openConfigMenu,
    setOpenConfigMenu,
    requestedNotFound,
  };

  // Components render restrictions
  const LOGGED_NO_BLOCKS_OTHER_PROFILE =
    !requesterBlocked && isLogged && !inLoggedProfile && !requestedBlocked;
  const LOGGED_OTHER_PROFILE =
    !requesterBlocked && isLogged && !inLoggedProfile;

  // UseEffects
  useEffect(() => {
    const setup = async () => {
      setLoading(true);
      setRequesterBlocked(false);
      setRequestedBlocked(false);
      setRequestedNotFound(false);
      await fetchProfileData();
      setLoading(false);
    };
    setup();
  }, [params]);

  const isSkeleton = loading || requesterBlocked || requestedNotFound;

  const primaryClassName = "profile-page";
  const customClassName = generateClassName(primaryClassName);

  return (
    <div className="div-page">
      <HeaderAndAside />
      {isSkeleton ? (
        <ProfileSkeleton profileMenuProps={profileMenuProps} />
      ) : (
        <>
          <main className={`${primaryClassName} ${actionBlock}`}>
            {requestedBlocked && <BlockedWarning />}
            <div className={customClassName("cover")}>
              <img
                src={coverUrl}
                alt=""
                className={customClassName("cover__image")}
              />
            </div>
            <section className={customClassName("content")}>
              <div className={customClassName("content__avatar-and-user")}>
                <img
                  src={avatarUrl}
                  alt=""
                  className={customClassName(
                    "content__avatar-and-user__avatar"
                  )}
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
              <div className={customClassName("content__actions")}>
                {LOGGED_NO_BLOCKS_OTHER_PROFILE && (
                  <ActionsProfile
                    fetchProfileData={fetchProfileData}
                    primaryClassName={customClassName("content__actions")}
                  />
                )}
                {LOGGED_OTHER_PROFILE && (
                  <button
                    className={customClassName("content__actions__config-btn")}
                    onClick={handleOpenConfig}
                  >
                    <Icon icon={icons["config"]} />
                  </button>
                )}
              </div>
              {!requesterBlocked && (
                <div className={customClassName("content__stats-and-posts")}>
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
                  <div
                    className={customClassName(
                      "content__stats-and-posts__posts"
                    )}
                  >
                    <SectionTitle
                      title="Posts"
                      icon={
                        gridView
                          ? "ri:layout-row-line"
                          : "material-symbols:grid-on-sharp"
                      }
                      onClickIcon={handleChangeView}
                    />
                    {!gridView && <Posts posts={profilePosts} />}
                    {gridView && <PostsGrid posts={profilePosts} />}
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
