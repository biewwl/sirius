import React from "react";
import { Link } from "react-router-dom";
import { verifiedType } from "../../helpers";
import generateClassName from "../../helpers/generateClassBEM";
import useTimer from "../../hooks/useTimer";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import "./styles/PostHeader.css";
import UserAvatarStory from "../UserAvatarStory";

function PostHeader({ postData }) {
  const { date, userPost } = postData;
  const { avatarUrl, name, nick, accountVerified } = userPost || {};
  const { icon, text } = verifiedType(accountVerified);
  const [currentTimer, currentFormat] = useTimer(date);
  const isVerified = accountVerified !== "none";

  const primaryClassName = "post-header-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <div className={customClassName("header")}>
      <UserAvatarStory avatarUrl={avatarUrl} size="40" nick={nick} borderRadius="0.75em" />
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
    </div>
  );
}

export default PostHeader;

PostHeader.propTypes = {
  postData: PropTypes.shape(),
};
