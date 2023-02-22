import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles/PostsGrid.css";

function PostsGrid({ posts }) {
  return (
    <section className="posts-grid">
      {posts.map((post, i) => {
        const { imageUrl, id} = post;

        return (
          <Link key={i} to={`/post/${id}`}>
            <img src={imageUrl} alt="" className="post-image" />
          </Link>
        );
      })}
    </section>
  );
}

export default PostsGrid;

PostsGrid.propTypes = {
  posts: PropTypes.array,
};
