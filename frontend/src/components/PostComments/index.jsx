import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostComment from "../PostComment";
import "./styles/PostComments.css";
import "./styles/PostComments-mobile.css";
import { useLocation } from "react-router-dom";

function PostComments({ comments }) {
  const [firstComments, setFirstComments] = useState([]);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const spliceComments = () => {
      console.log(path);
      if (path === "/" || path.includes("/p/")) {
        const newComments = comments.slice(0, 3);
        setFirstComments(newComments);
      } else {
        setFirstComments(comments);
      }
    };
    spliceComments();
  }, [comments]);

  return (
    <>
      {comments.length > 0 && (
        <section className="post-comments-component">
          {firstComments.map((postComment, i) => {
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
