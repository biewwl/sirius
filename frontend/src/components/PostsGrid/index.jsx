import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import generateClassName from "../../helpers/generateClassBEM";
import { Icon } from "@iconify/react";
import { FileIcon } from "react-file-icon";
import "./styles/PostsGrid.css";
import { getExtension } from "../../helpers/fileExtensions";

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

        const splittedCaption = (letters) => caption.slice(0, letters);

        const url = imageUrl ?? "";

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
              <div className={customClassName("link-image__text")}>
                <FileIcon
                  labelColor="var(--accent)"
                  glyphColor="var(--accent)"
                  extension={getExtension(url)}
                  type="binary"
                />
                {splittedCaption(15)}
                {caption.length > 15 && "..."}
              </div>
            )}
            {isDocs() && (
              <div className={customClassName("link-image__text")}>
                <FileIcon
                  labelColor="var(--accent)"
                  glyphColor="var(--accent)"
                  extension={getExtension(url)}
                  type="document"
                />
                {splittedCaption(15)}
                {caption.length > 15 && "..."}
              </div>
            )}
            {!imageUrl && (
              <span className={customClassName("link-image__text")}>
                <Icon
                  icon="raphael:quote"
                  className={customClassName("link-image__text__icon")}
                />
                {splittedCaption(40)}
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
