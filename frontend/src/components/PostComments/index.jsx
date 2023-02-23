import React from "react";
import PropTypes from "prop-types";
import PostComment from "../PostComment";
import "./styles/PostComments.css";
import "./styles/PostComments-mobile.css";

function PostComments({ comments }) {
  return (
    <>
      {comments.length > 0 && (
        <section className="post-comments-component">
          {comments.map((postComment, i) => {
            return <PostComment commentData={postComment} key={i} />;
          })}
        </section>
      )}
    </>
  );
}

export default PostComments;

PostComments.propTypes = {
  comments: PropTypes.array,
};
