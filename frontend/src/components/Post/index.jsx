import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { verifiedType } from "../../helpers";
import { Link } from "react-router-dom";
import PostActions from "../PostActions";
import PostComments from "../PostComments";
import useTimer from "../../hooks/useTimer";
import "./styles/Post.css";
import { getPostComments } from "../../helpers/fetch";
import { connect } from "react-redux";

function Post({ postData, token }) {
  const { caption, date, imageUrl, userPost, id } = postData;
  const { avatarUrl, name, nick, accountVerified } = userPost;
  const [currentTimer, currentFormat] = useTimer(date);
  const isVerified = accountVerified !== "none";

  const [postComments, setPostComments] = useState([]);

  const fetchComments = useCallback(async () => {
    const comments = await getPostComments(token, id);
    setPostComments(comments);
  });

  useEffect(() => {
    fetchComments();
  }, [id]);

  const { icon, text } = verifiedType(accountVerified);

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
      <PostActions postId={id} updateComments={fetchComments} />
      <PostComments comments={postComments} />
    </section>
  );
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Post);

Post.propTypes = {
  postData: PropTypes.shape(),
  token: PropTypes.string,
};
