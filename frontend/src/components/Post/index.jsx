import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { verifiedType } from "../../helpers";
import { Link } from "react-router-dom";
import "./styles/Post.css";
import elapsedTime from "../../helpers/elapsedTime";

function Post({ postData }) {
  const [currentTimer, setCurrentTimer] = useState("-");
  const [currentFormat, setCurrentFormat] = useState("-");

  useEffect(() => {
    const getTimer = () => {
      const interval = setInterval(() => {
        const { timer, format } = elapsedTime(date);
        setCurrentTimer(timer);
        setCurrentFormat(format);
      }, 1000);
      return interval;
    };
    const interval = getTimer();
    return () => clearInterval(interval);
  }, [postData]);

  const { caption, date, imageUrl, userPost, id } = postData;
  const { avatarUrl, name, nick, accountVerified } = userPost;
  const { icon, text } = verifiedType(accountVerified);
  const isVerified = accountVerified !== "none";

  return (
    <section className="post" to={`/post/${id}`}>
      <div className="post__header">
        <Link to={`/${nick}`}>
          <img src={avatarUrl} alt="" className="post__user-avatar" />
        </Link>
        <div>
          <Link to={`/${nick}`} className="name_nick">
            <span className="name">
              {name}
              {isVerified && (
                <div title={text}>
                  <Icon icon={icon} className={`verified-${accountVerified}`} />
                </div>
              )}
            </span>
            |<span className="nick">@{nick}</span>
          </Link>
          <span className="timer">
            {currentTimer}
            {currentFormat}
          </span>
        </div>
      </div>
      <p className="post__caption">{caption}</p>
      <Link to={`/post/${id}`} className="link-to-post">
        <img src={imageUrl} alt="" className="post__image" />
      </Link>
    </section>
  );
}

export default Post;

Post.propTypes = {
  postData: PropTypes.shape(),
};
