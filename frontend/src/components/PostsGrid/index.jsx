import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/PostsGrid.css";

function PostsGrid({ posts }) {
  const primaryClassName = "posts-grid-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <section className={primaryClassName}>
      {posts.map((post, i) => {
        const { imageUrl, id } = post;

        return (
          <Link
            key={i}
            to={`/post/${id}`}
            className={customClassName("link-image")}
          >
            <img
              src={imageUrl}
              alt=""
              className={customClassName("link-image__image")}
            />
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
