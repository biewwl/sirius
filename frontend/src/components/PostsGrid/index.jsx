import React from "react";
import PropTypes from "prop-types";
import PostsGridItem from "../PostsGridItem";
import "./styles/PostsGrid.css";

function PostsGrid({ posts }) {
  const primaryClassName = "posts-grid-component";

  return (
    <section className={primaryClassName}>
      {posts.map((post, i) => <PostsGridItem post={post} key={i} />)}
    </section>
  );
}

export default PostsGrid;

PostsGrid.propTypes = {
  posts: PropTypes.array,
};
