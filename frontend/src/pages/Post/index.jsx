import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../helpers/fetch";
import { Link, useParams } from "react-router-dom";
import HeaderAndAside from "../../components/HeaderAndAside";
import { verifiedType } from "../../helpers";
import Skeleton from "./skeleton";
import { Icon } from "@iconify/react";
import PostActions from "../../components/PostActions";
import useTimer from "../../hooks/useTimer";
import PostComments from "../../components/PostComments";
import "./styles/Post.css";
import "./styles/Post-mobile.css";

function Post({ token }) {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      const post = await getPost(token, postId);
      setPostData(post);
      setLoading(false);
    };
    fetchPostData();
  }, []);

  const { caption, date, imageUrl, userPost, id } = postData;
  const { avatarUrl, name, nick, accountVerified } = userPost || {};
  const { icon, text } = verifiedType(accountVerified);
  const [currentTimer, currentFormat] = useTimer(date);
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
            <PostActions postId={id} />
            <PostComments postId={id} />
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
