import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import useTimer from "../../hooks/useTimer";
import { Link } from "react-router-dom";
import { verifiedType } from "../../helpers";
import { Icon } from "@iconify/react";
import generateClassName from "../../helpers/generateClassBEM";
import UserAvatarStory from "../UserAvatarStory";
import "./styles/PostComment.css";

function PostComment({ commentData, accountDataREDUX }) {
  const { comment, date, userComment } = commentData;
  const { avatarUrl, name, nick, accountVerified } = userComment;
  const [currentTimer, currentFormat] = useTimer(date);

  const isVerified = accountVerified !== "none";
  const { icon, text } = verifiedType(accountVerified);

  const primaryClassName = "post-comment-component";
  const customClassName = generateClassName(primaryClassName);

  const { nick: loggedNick, avatarUrl: loggedAvatarUrl } = accountDataREDUX;

  const loggedOwner = loggedNick === nick;

  const dynamicAvatar = loggedOwner ? loggedAvatarUrl : avatarUrl;

  return (
    <div className={primaryClassName}>
      <div to={`/p/${nick}`} className={customClassName("avatar-link")}>
        <UserAvatarStory
          avatarUrl={dynamicAvatar}
          nick={nick}
          size="40"
          borderWidth="2"
        />
      </div>
      <section className={customClassName("comment-area")}>
        <div className={customClassName("comment-area__name-and-timer")}>
          <Link
            to={`/p/${nick}`}
            className={customClassName(
              "comment-area__name-and-timer__name-area"
            )}
          >
            <span
              className={customClassName(
                "comment-area__name-and-timer__name-area__name"
              )}
            >
              {name}
              {isVerified && (
                <div
                  title={text}
                  className={customClassName(
                    "comment-area__name-and-timer__name-area__name__verified"
                  )}
                >
                  <Icon icon={icon} className={`verified-${accountVerified}`} />
                </div>
              )}
            </span>
          </Link>
          <span
            className={customClassName("comment-area__name-and-timer__timer")}
          >
            {currentTimer}
            {currentFormat}
          </span>
        </div>
        <p className={customClassName("comment-area__comment")}>{comment}</p>
      </section>
    </div>
  );
}

PostComment.propTypes = {};

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(PostComment);

PostComment.propTypes = {
  postData: PropTypes.shape(),
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
  isImage: PropTypes.func,
  dispatch: PropTypes.func,
  commentData: PropTypes.shape(),
};
