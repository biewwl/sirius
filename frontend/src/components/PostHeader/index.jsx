import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifiedType } from "../../helpers";
import generateClassName from "../../helpers/generateClassBEM";
import useTimer from "../../hooks/useTimer";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import UserAvatarStory from "../UserAvatarStory";
import { connect } from "react-redux";
import { deletePost } from "../../helpers/requests/DELETE/post";
import { updateAccountDataAction } from "../../redux/actions/userAction";
import { updateAvatar, updateCover } from "../../helpers/requests/PUT/user";
import "./styles/PostHeader.css";

function PostHeader({
  postData,
  accountDataREDUX,
  token,
  isImage,
  dispatch,
  setup,
  selectedImageUrl,
}) {
  const { date, userPost, id } = postData;
  const { avatarUrl, name, nick, accountVerified } = userPost || {};
  const { icon, text } = verifiedType(accountVerified);
  const [currentTimer, currentFormat] = useTimer(date);
  const isVerified = accountVerified !== "none";
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const primaryClassName = "post-header-component";
  const customClassName = generateClassName(primaryClassName);

  const { nick: loggedNick, avatarUrl: loggedAvatarUrl } = accountDataREDUX;

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const loggedOwner = loggedNick === nick;

  const handleDeletePost = async () => {
    await deletePost(token, id);
    dispatch(updateAccountDataAction(token));
    navigate(`/p/${loggedNick}`);
    if (location.pathname.slice(0, 3) === "/p/") {
      setup();
    }
  };

  const handleUpdateAvatar = async () => {
    await updateAvatar(token, selectedImageUrl);
    dispatch(updateAccountDataAction(token));
  };

  const handleUpdateCover = async () => {
    await updateCover(token, selectedImageUrl);
    dispatch(updateAccountDataAction(token));
  };

  const dynamicAvatar = loggedOwner ? loggedAvatarUrl : avatarUrl;

  return (
    <div className={customClassName("header")}>
      <UserAvatarStory
        avatarUrl={dynamicAvatar}
        size="40"
        nick={nick}
        borderRadius="0.75em"
      />
      <div className={customClassName("header__texts-area")}>
        <Link
          to={`/p/${nick}`}
          className={customClassName("header__texts-area__name-and-verified")}
        >
          <span
            className={customClassName(
              "header__texts-area__name-and-verified__name"
            )}
          >
            {name}
            {isVerified && (
              <div
                title={text}
                className={customClassName(
                  "header__texts-area__name-and-verified__name__icon-verified"
                )}
              >
                <Icon icon={icon} className={`verified-${accountVerified}`} />
              </div>
            )}
          </span>
        </Link>
        <span className={customClassName("header__texts-area__timer")}>
          {currentTimer}
          {currentFormat} ago
        </span>
      </div>
      {loggedOwner && (
        <>
          <button
            className={customClassName("header__manager-btn")}
            onClick={handleOpenMenu}
          >
            <Icon icon="tabler:dots" />
          </button>
          {openMenu && (
            <div className={customClassName("header__manager-menu")}>
              {isImage() && (
                <>
                  <button
                    className={customClassName("header__manager-menu__btn")}
                    onClick={handleUpdateAvatar}
                  >
                    Set image as profile avatar
                  </button>
                  <button
                    className={customClassName("header__manager-menu__btn")}
                    onClick={handleUpdateCover}
                  >
                    Set image as profile cover
                  </button>
                </>
              )}
              <button
                className={customClassName(
                  "header__manager-menu__btn",
                  " --delete"
                )}
                onClick={handleDeletePost}
              >
                Delete Post
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(PostHeader);

PostHeader.propTypes = {
  postData: PropTypes.shape(),
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
  isImage: PropTypes.func,
  dispatch: PropTypes.func,
  setup: PropTypes.func,
  selectedImageUrl: PropTypes.string,
};
