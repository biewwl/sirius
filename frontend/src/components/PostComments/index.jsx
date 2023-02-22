import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPostComments } from "../../helpers/fetch";
import PostComment from "../PostComment";
import "./styles/PostComments.css";
import "./styles/PostComments-mobile.css";

function PostComments({ token, postId }) {
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getPostComments(token, postId);
      setPostComments(comments);
    };
    fetchComments();
  }, [postId]);

  return (
    <section className="post-comments">
      {postComments.map((postComment, i) => {
        return <PostComment commentData={postComment} key={i} />;
      })}
    </section>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(PostComments);

PostComments.propTypes = {
  token: PropTypes.string,
  postId: PropTypes.number,
};
