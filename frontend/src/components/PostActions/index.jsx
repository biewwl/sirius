import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import {
  createPostComment,
  createPostLike,
  checkILike,
  checkISave,
  countPostLikes,
  countPostComments,
  countPostViews,
  createPostSave,
  deletePostLike,
  deletePostSave,
} from "../../helpers/fetch";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/PostActions.css";

function PostActions({ token, postId, updateComments }) {
  const [likesCount, setLikesCount] = useState("-");
  const [commentsCount, setCommentsCount] = useState("-");
  const [impressionsCount, setImpressionsCount] = useState("-");
  const [iLike, setILike] = useState(false);
  const [iSave, setISave] = useState(false);
  const [comment, setComment] = useState("");

  const getPostStats = useCallback(async () => {
    const likes = await countPostLikes(token, postId);
    const comments = await countPostComments(token, postId);
    const impressions = await countPostViews(token, postId);
    const iLikePost = await checkILike({ token, postId });
    const iSavePost = await checkISave({ token, postId });
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
  const iconSave = iSave ? "majesticons:bookmark" : "majesticons:bookmark-line";

  const handleLikeOrUnlikePost = async () => {
    if (iLike) {
      await deletePostLike(token, postId);
    } else {
      await createPostLike(token, postId);
    }
    getPostStats();
  };

  const handleSaveOrRemoveSavePost = async () => {
    if (iSave) {
      await deletePostSave(token, postId);
    } else {
      await createPostSave(token, postId);
    }
    getPostStats();
  };

  const handleSendComment = async (e) => {
    e.preventDefault();
    await createPostComment(token, postId, comment);
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
            icon="gridicons:stats-alt-2"
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
            icon="carbon:send"
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
