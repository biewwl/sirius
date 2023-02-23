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
import generateClassName from "../../helpers/generateClassBEM";

function PostActions({ token, postId, updateComments }) {
  const [likesCount, setLikesCount] = useState("-");
  const [commentsCount, setCommentsCount] = useState("-");
  const [impressionsCount, setImpressionsCount] = useState("-");
  const [iLike, setILike] = useState(false);
  const [iSave, setISave] = useState(false);
  const [comment, setComment] = useState("");

  const getPostStats = useCallback(async () => {
    const likes = await getPostStatsCount("likes", token, postId);
    const comments = await getPostStatsCount("comments", token, postId);
    const impressions = await getPostStatsCount("views", token, postId);
    const iLikePost = await getILikeSavePost(token, postId, "like");
    const iSavePost = await getILikeSavePost(token, postId, "save");
    setLikesCount(likes);
    setCommentsCount(comments);
    setImpressionsCount(impressions);
    setILike(iLikePost);
    setISave(iSavePost);
  });

  useEffect(() => {
    getPostStats();
  }, []);

  const iconLike = iLike ? "solid" : "outline";
  const iconSave = iSave ? "ic:sharp-bookmark" : "ic:sharp-bookmark-border";

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

  const primaryClassName = "post-actions-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <section className={primaryClassName}>
      <div className={customClassName("buttons-and-impressions")}>
        <div className={customClassName("buttons-and-impressions__buttons")}>
          <button
            className={customClassName(
              "buttons-and-impressions__buttons__button",
              null,
              "like"
            )}
            onClick={handleLikeOrUnlikePost}
          >
            <Icon
              icon={`icon-park-${iconLike}:like`}
              className={customClassName(
                "buttons-and-impressions__buttons__button__icon"
              )}
            />
            {likesCount}
          </button>
          <button
            className={customClassName(
              "buttons-and-impressions__buttons__button",
              null,
              "comment"
            )}
          >
            <label htmlFor={`input-comment-${postId}`}>
              <Icon
                icon="octicon:comment-24"
                className={customClassName(
                  "buttons-and-impressions__buttons__button__icon"
                )}
              />
            </label>
            {commentsCount}
          </button>
          <button
            className={customClassName(
              "buttons-and-impressions__buttons__button",
              null,
              "send"
            )}
          >
            <Icon
              icon="ph:paper-plane-tilt"
              className={customClassName(
                "buttons-and-impressions__buttons__button__icon"
              )}
            />
          </button>
          <button
            className={customClassName(
              "buttons-and-impressions__buttons__button",
              null,
              "save"
            )}
            onClick={handleSaveOrRemoveSavePost}
          >
            <Icon
              icon={`${iconSave}`}
              className={customClassName(
                "buttons-and-impressions__buttons__button__icon"
              )}
            />
          </button>
        </div>
        <div
          className={customClassName("buttons-and-impressions__impressions")}
        >
          <Icon
            icon="basil:fire-outline"
            className={customClassName(
              "buttons-and-impressions__impressions__icon"
            )}
          />
          <span
            className={customClassName(
              "buttons-and-impressions__impressions__count"
            )}
          >
            {impressionsCount}
          </span>
        </div>
      </div>
      <form
        method="POST"
        className={customClassName("comment-area")}
        onSubmit={handleSendComment}
      >
        <input
          type="text"
          placeholder="Write a comment..."
          id={`input-comment-${postId}`}
          value={comment}
          onChange={handleInputCommentChange}
          className={customClassName("comment-area__input")}
        />
        <button
          type="submit"
          className={customClassName("comment-area__submit-btn")}
        >
          <Icon
            icon="ri:send-plane-2-line"
            className={customClassName("comment-area__submit-btn__icon")}
          />
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
  updateComments: PropTypes.func,
};
