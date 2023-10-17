import React from "react";
import PropTypes from "prop-types";
import Post from "../Post";
import "./styles/Posts.css";

function Posts({ posts, setup }) {
  return (
    <section className="posts-component">
      {posts.map((post, i) => (
        <Post postData={post} setup={setup} key={i} />
      ))}
    </section>
  );
}

export default Posts;

Posts.propTypes = {
  posts: PropTypes.array,
  setup: PropTypes.func,
};
