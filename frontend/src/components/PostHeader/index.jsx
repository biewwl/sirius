import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifiedType } from "../../helpers";
import generateClassName from "../../helpers/generateClassBEM";
import useTimer from "../../hooks/useTimer";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import UserAvatarStory from "../UserAvatarStory";
import { connect } from "react-redux";
import "./styles/PostHeader.css";

function PostHeader({ postData, accountDataREDUX, token }) {
  const { date, userPost, id } = postData;
  const { avatarUrl, name, nick, accountVerified } = userPost || {};
  const { icon, text } = verifiedType(accountVerified);
  const [currentTimer, currentFormat] = useTimer(date);
  const isVerified = accountVerified !== "none";
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const primaryClassName = "post-header-component";
  const customClassName = generateClassName(primaryClassName);

  const { nick: loggedNick } = accountDataREDUX;

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const loggedOwner = loggedNick === nick;

  const handleDeletePost = async () => {
    await fetch(
      `
      http://10.0.0.98:3010/post/${id}`,
      { headers: { authorization: token }, method: "DELETE" }
      );
      navigate(`/p/${loggedNick}`);
  };

  return (
    <div className={customClassName("header")}>
      <UserAvatarStory
        avatarUrl={avatarUrl}
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
              <button
                className={customClassName(
                  "header__manager-menu__btn",
                  " --delete"
                )}
                onClick={handleDeletePost}
              >
                <Icon icon="mingcute:delete-line" />
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
};
