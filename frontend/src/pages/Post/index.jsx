import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../helpers/fetch";
import { Link, useParams } from "react-router-dom";
import HeaderAndAside from "../../components/HeaderAndAside";
import "./styles/Post.css";
import { verifiedType } from "../../helpers";
import Skeleton from "./skeleton";
import { Icon } from "@iconify/react";
import elapsedTime from "../../helpers/elapsedTime";

function Post({ token }) {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      const post = await getPost(token, postId);
      setPostData(post);
      setLoading(false);
    };
    fetchPostData();
  }, []);

  const { caption, date, imageUrl, userPost } = postData;
  const { avatarUrl, name, nick, accountVerified } = userPost || {};
  const { icon, text } = verifiedType(accountVerified);
  const isVerified = accountVerified !== "none";

  return (
    <div className="div-page">
      <HeaderAndAside />
      {loading ? (
        <Skeleton />
      ) : (
        <div className="post-container">
          <div className="image">
            <img src={imageUrl} alt="" />
          </div>
          <div className="content">
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
                        <Icon
                          icon={icon}
                          className={`verified-${accountVerified}`}
                        />
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
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Post);

Post.propTypes = {
  token: PropTypes.string,
};
