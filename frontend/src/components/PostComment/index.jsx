import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import useTimer from "../../hooks/useTimer";
import { Link } from "react-router-dom";
import { verifiedType } from "../../helpers";
import { Icon } from "@iconify/react";
import "./styles/PostComment.css";

function PostComment({ commentData }) {
  const { comment, date, userComment } = commentData;
  const { avatarUrl, name, nick, accountVerified } = userComment;
  const [currentTimer, currentFormat] = useTimer(date);

  const isVerified = accountVerified !== "none";
  const { icon, text } = verifiedType(accountVerified);

  return (
    <>
      <Link to={`/${nick}`} className="comment-avatar">
        <img src={avatarUrl} alt="" className="post-comment__user-avatar" />
      </Link>
      <section className="post-comment">
        <div className="comment-header">
          <div>
            <Link to={`/${nick}`} className="comment-name">
              <span className="name">
                {name}
                {isVerified && (
                  <div title={text}>
                    <Icon
                      icon={icon}
                      className={`verified-${accountVerified}`}
                    />
                  </div>
                )}
              </span>
            </Link>
            <span className="timer">
              {currentTimer}
              {currentFormat}
            </span>
          </div>
        </div>
        <p className="comment">{comment}</p>
      </section>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(PostComment);

PostComment.propTypes = {
  commentData: PropTypes.shape(),
};
