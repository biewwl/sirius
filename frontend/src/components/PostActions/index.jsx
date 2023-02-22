import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import {
  commentPost,
  getILikeSavePost,
  getPostStatsCount,
  likeSavePost,
} from "../../helpers/fetch";
import "./styles/PostActions.css";

function PostActions({ token, postId, updateComments }) {
  const [likesCount, setLikesCount] = useState("-");
  const [commentsCount, setCommentsCount] = useState("-");
  const [viewsCount, setViewsCount] = useState("-");
  const [iLike, setILike] = useState(false);
  const [iSave, setISave] = useState(false);
  const [comment, setComment] = useState("");

  const getPostStats = useCallback(async () => {
    const likes = await getPostStatsCount("likes", token, postId);
    const comments = await getPostStatsCount("comments", token, postId);
    const views = await getPostStatsCount("views", token, postId);
    const iLikePost = await getILikeSavePost(token, postId, "like");
    const iSavePost = await getILikeSavePost(token, postId, "save");
    setLikesCount(likes);
    setCommentsCount(comments);
    setViewsCount(views);
    setILike(iLikePost);
    setISave(iSavePost);
  });

  useEffect(() => {
    getPostStats();
  }, []);

  const iconLike = iLike ? "solid" : "outline";
  const iconSave = iSave
    ? "ic:sharp-bookmark"
    : "ic:sharp-bookmark-border";

  const handleLikeOrUnlikePost = async () => {
    const typeRequest = iLike ? "unlike" : "like";
    await likeSavePost(token, postId, typeRequest);
    getPostStats();
  };

  const handleSaveOrRemoveSavePost = async () => {
    const typeRequest = iSave ? "remove-saved" : "save";
    await likeSavePost(token, postId, typeRequest);
    getPostStats();
  };

  const handleSendComment = async (e) => {
    e.preventDefault();
    await commentPost(token, postId, comment);
    setComment("");
    getPostStats();
    updateComments();
  };

  const handleInputCommentChange = ({ target }) => {
    const { value } = target;
    setComment(value);
  };

  return (
    <section className="post-actions">
      <div className="buttons">
        <div className="left-content">
          <button className="like" onClick={handleLikeOrUnlikePost}>
            <Icon icon={`icon-park-${iconLike}:like`} />
            {likesCount}
          </button>
          <button className="comment">
            <label htmlFor={`input-comment-${postId}`}>
              <Icon icon="octicon:comment-24" />
            </label>
            {commentsCount}
          </button>
          <button className="send">
            <Icon icon="ph:paper-plane-tilt" />
          </button>
          <button className="save" onClick={handleSaveOrRemoveSavePost}>
            <Icon icon={`${iconSave}`} />
          </button>
        </div>
        <div className="right-content">
          <div className="impressions-container">
            <Icon icon="basil:fire-outline" className="impressions" />
            <span className="impressions-count">{viewsCount}</span>
          </div>
        </div>
      </div>
      <form method="POST" className="form-comment" onSubmit={handleSendComment}>
        <input
          type="text"
          placeholder="Write a comment..."
          id={`input-comment-${postId}`}
          value={comment}
          onChange={handleInputCommentChange}
        />
        <button type="submit" className="btn-send-comment">
          <Icon icon="ri:send-plane-2-line" className="send-comment" />
        </button>
      </form>
    </section>
  );
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(PostActions);

PostActions.propTypes = {
  token: PropTypes.string,
  postId: PropTypes.number,
  updateComments: PropTypes.func
};
