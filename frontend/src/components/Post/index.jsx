import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostActions from "../PostActions";
import PostComments from "../PostComments";
import { getPostComments } from "../../helpers/fetch";
import { connect } from "react-redux";
import generateClassName from "../../helpers/generateClassBEM";
import PostHeader from "../PostHeader";
import "./styles/Post.css";

function Post({ postData, token }) {
  const { caption, imageUrl, id } = postData;

  const [postComments, setPostComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState([]);

  const fetchComments = useCallback(async () => {
    const comments = await getPostComments(token, id);
    setPostComments(comments);
  });

  const hiddenComments = commentsLength > 3 ? commentsLength - 3 : false;

  useEffect(() => {
    fetchComments();
  }, [id]);

  useEffect(() => {
    const defineCommentsLength = () => {
      setCommentsLength(postComments.length);
    };
    defineCommentsLength();
  }, [postComments]);

  const primaryClassName = "post-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <section className={primaryClassName} to={`/post/${id}`}>
      <PostHeader postData={postData} />
      <p className={customClassName("caption")}>{caption}</p>
      <Link to={`/post/${id}`} className={customClassName("link-image")}>
        <img
          src={imageUrl}
          alt=""
          className={customClassName("link-image__image")}
        />
      </Link>
      <PostActions postId={id} updateComments={fetchComments} />
      <PostComments comments={postComments} />
      {hiddenComments && (
        <Link to={`/post/${id}`} className={customClassName("link-to-hidden-comments")}>
          see more {hiddenComments}{" "}
          {hiddenComments > 1 ? "comments" : "comment"}
        </Link>
      )}
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
