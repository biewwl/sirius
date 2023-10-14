import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/PostsGrid.css";
import { Icon } from "@iconify/react";

function PostsGrid({ posts }) {
  const primaryClassName = "posts-grid-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <section className={primaryClassName}>
      {posts.map((post, i) => {
        const { imageUrl, id, caption } = post;

        const splittedCaption = caption.slice(0, 40);

        return (
          <Link
            key={i}
            to={`/post/${id}`}
            className={customClassName("link-image")}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt=""
                className={customClassName("link-image__image")}
              />
            ) : (
              <span className={customClassName("link-image__text")}>
                <Icon
                  icon="game-icons:feather"
                  className={customClassName("link-image__text__icon")}
                />
                {splittedCaption}{caption.length > 40 && "..."}
              </span>
            )}
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
