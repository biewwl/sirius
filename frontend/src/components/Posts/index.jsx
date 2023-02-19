import React from "react";
import PropTypes from "prop-types";
import Post from "../Post";
import "./styles/Posts.css";

function Posts({ posts }) {
  return (
    <section className="posts_container">
      {posts.map((post, i) => (
        <Post postData={post} key={i} />
      ))}
    </section>
  );
}

export default Posts;

Posts.propTypes = {
  posts: PropTypes.array,
};
