import React from "react";
import { Link } from "react-router-dom";
import { verifiedType } from "../../helpers";
import generateClassName from "../../helpers/generateClassBEM";
import useTimer from "../../hooks/useTimer";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import "./styles/PostHeader.css";

function PostHeader({ postData }) {
  const { date, userPost } = postData;
  const { avatarUrl, name, nick, accountVerified } = userPost || {};
  const { icon, text } = verifiedType(accountVerified);
  const [currentTimer, currentFormat] = useTimer(date);
  const isVerified = accountVerified !== "none";

  const primaryClassName = "post-header-component"
  const customClassName = generateClassName(primaryClassName);

  return (
    <div className={customClassName("header")}>
      <Link to={`/p/${nick}`} className={customClassName("header__image-area")}>
        <img
          src={avatarUrl}
          alt=""
          className={customClassName("header__image-area__avatar")}
        />
      </Link>
      <div className={customClassName("header__texts-area")}>
        <Link
          to={`/p/${nick}`}
          className={customClassName("header__texts-area__name-and-nick")}
        >
          <span
            className={customClassName(
              "header__texts-area__name-and-nick__name"
            )}
          >
            {name}
            {isVerified && (
              <div
                title={text}
                className={customClassName(
                  "header__texts-area__name-and-nick__name__icon-verified"
                )}
              >
                <Icon icon={icon} className={`verified-${accountVerified}`} />
              </div>
            )}
          </span>
          |
          <span
            className={customClassName(
              "header__texts-area__name-and-nick__nick"
            )}
          >
            @{nick}
          </span>
        </Link>
        <span className={customClassName("header__texts-area__timer")}>
          {currentTimer}
          {currentFormat}
        </span>
      </div>
    </div>
  );
}

export default PostHeader;

PostHeader.propTypes = {
  postData: PropTypes.shape(),
};
