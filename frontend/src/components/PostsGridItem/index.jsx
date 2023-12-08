import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import generateClassName from "../../helpers/generateClassBEM";
import { Icon } from "@iconify/react";
import { FileIcon } from "react-file-icon";
import { getExtension } from "../../helpers/fileExtensions";
import { getPost } from "../../helpers/fetch";
import { connect } from "react-redux";

function PostsGridItem({ post, token }) {
  const primaryClassName = "posts-grid-component";
  const customClassName = generateClassName(primaryClassName);
  const { repost, id } = post;

  const isRepost = repost ? true : false;

  const onlyRepost =
    post.postFiles.length === 0 && post.caption.length === 0 && isRepost;

  const [repostData, setRepostData] = useState(null);

  const returnRepost = () => {
    if (onlyRepost && repostData) {
      return repostData;
    }
    return null
  }

  const { postFiles, caption } = returnRepost() ?? post;

  const firstFile = postFiles[0];
  const { fileUrl } = firstFile ?? "";

  const isVideo = () => {
    if (fileUrl) {
      const video = fileUrl.includes("videos|");
      if (video) return true;
    }
  };

  const isOther = () => {
    if (fileUrl) {
      const others = fileUrl.includes("others|");
      if (others) return true;
    }
  };

  const isDocs = () => {
    if (fileUrl) {
      const docs = fileUrl.includes("docs|");
      if (docs) return true;
    }
  };

  const isImage = () => {
    const image = !isDocs() && !isOther() && !isVideo() && fileUrl;
    return image;
  };

  const splittedCaption = (letters) => {
    let newCaption = caption.slice(0, letters);
    if (caption.length > 15) {
      newCaption += "...";
    } else if (caption.length < 1) {
      newCaption = null;
    }
    return newCaption;
  };

  const url = fileUrl ?? "";

  const multiple = postFiles.length > 1;

  const fileName = () => {
    if (isDocs() || isOther()) {
      const splittedUrl = fileUrl.split("|")[1];
      const onlyFileName = splittedUrl.split("_")[1];

      let smallName = onlyFileName.slice(0, 15);
      if (onlyFileName.length > 15) smallName += "...";

      return smallName;
    }
  };

  useEffect(() => {
    const getRepost = async () => {
      if (isRepost) {
        const getRepostData = await getPost(token, repost);
        setRepostData(getRepostData);
      }
    };
    getRepost();
  }, []);

  return (
    <Link to={`/post/${id}`} className={customClassName("link-image")}>
      {multiple && (
        <Icon
          icon="fluent:square-multiple-32-filled"
          className={customClassName("link-image__multiple")}
        />
      )}
      {isRepost && (
        <Icon
          icon="mdi:repost"
          className={customClassName("link-image__multiple")}
        />
      )}
      {isImage() && (
        <img
          src={fileUrl}
          alt=""
          className={customClassName("link-image__image")}
        />
      )}
      {isVideo() && (
        <video className={customClassName("link-image__image")}>
          <source src={fileUrl} type="video/mp4" />
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
          {splittedCaption(15) ?? fileName()}
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
          {splittedCaption(15) ?? fileName()}
        </div>
      )}
      {!fileUrl && (
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
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(PostsGridItem);

PostsGridItem.propTypes = {
  post: PropTypes.shape(),
  token: PropTypes.string,
};
