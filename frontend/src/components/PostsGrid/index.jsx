import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import generateClassName from "../../helpers/generateClassBEM";
import { Icon } from "@iconify/react";
import "./styles/PostsGrid.css";

function PostsGrid({ posts }) {
  const primaryClassName = "posts-grid-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <section className={primaryClassName}>
      {posts.map((post, i) => {
        const { imageUrl, id, caption } = post;

        const isVideo = () => {
          if (imageUrl) {
            const video = imageUrl.includes("videos|");
            if (video) return true;
          }
        };

        const isOther = () => {
          if (imageUrl) {
            const others = imageUrl.includes("others|");
            if (others) return true;
          }
        };

        const isDocs = () => {
          if (imageUrl) {
            const docs = imageUrl.includes("docs|");
            if (docs) return true;
          }
        };

        const isImage = () => {
          const image = !isDocs() && !isOther() && !isVideo() && imageUrl;
          return image;
        };

        const splittedCaption = caption.slice(0, 40);

        return (
          <Link
            key={i}
            to={`/post/${id}`}
            className={customClassName("link-image")}
          >
            {isImage() && (
              <img
                src={imageUrl}
                alt=""
                className={customClassName("link-image__image")}
              />
            )}
            {isVideo() && (
              <video className={customClassName("link-image__image")}>
                <source src={imageUrl} type="video/mp4" />
                Seu navegador não suporta a exibição de vídeos.
              </video>
            )}
            {isOther() && (
              <div className={customClassName("link-image__others")}>
                <Icon
                  icon="mi:warning"
                  className={customClassName("link-image__others__icon")}
                />
                {/* Binary */}
                {caption && (
                  <p className={customClassName("link-image__others__caption")}>
                    {splittedCaption}
                  </p>
                )}
              </div>
            )}
            {isDocs() && (
              <div className={customClassName("link-image__docs")}>
                <Icon
                  icon="gala:file-document"
                  className={customClassName("link-image__docs__icon")}
                />
                {/* Document */}
                {caption && (
                  <p className={customClassName("link-image__docs__caption")}>
                    {splittedCaption}
                  </p>
                )}
              </div>
            )}

            {!imageUrl && (
              <span className={customClassName("link-image__text")}>
                <Icon
                  icon="mdi:feather"
                  className={customClassName("link-image__text__icon")}
                />
                {splittedCaption}
                {caption.length > 40 && "..."}
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
