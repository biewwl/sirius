import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import useTimer from "../../hooks/useTimer";
import { Link } from "react-router-dom";
import { verifiedType } from "../../helpers";
import { Icon } from "@iconify/react";
import "./styles/PostComment.css";
import generateClassName from "../../helpers/generateClassBEM";

function PostComment({ commentData }) {
  const { comment, date, userComment } = commentData;
  const { avatarUrl, name, nick, accountVerified } = userComment;
  const [currentTimer, currentFormat] = useTimer(date);

  const isVerified = accountVerified !== "none";
  const { icon, text } = verifiedType(accountVerified);

  const primaryClassName = "post-comment-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <div className={primaryClassName}>
      <Link to={`/${nick}`} className={customClassName("avatar-link")}>
        <img
          src={avatarUrl}
          alt=""
          className={customClassName("avatar-link__avatar")}
        />
      </Link>
      <section className={customClassName("comment-area")}>
        <div className={customClassName("comment-area__name-and-timer")}>
          <Link
            to={`/${nick}`}
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

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(PostComment);

PostComment.propTypes = {
  commentData: PropTypes.shape(),
};
