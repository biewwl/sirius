import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostActions from "../PostActions";
import PostComments from "../PostComments";
import { getPostComments } from "../../helpers/fetch";
import { connect } from "react-redux";
import generateClassName from "../../helpers/generateClassBEM";
import PostHeader from "../PostHeader";
import "./styles/Post.css";
import "./styles/Post-mobile.css";
import { Icon } from "@iconify/react";

function Post({ postData, token }) {
  const { caption, imageUrl, id } = postData;

  const [postComments, setPostComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState([]);

  const fetchComments = useCallback(async () => {
    const comments = await getPostComments(token, id);
    setPostComments(comments);
  });

  const hiddenComments = commentsLength > 3 ? commentsLength - 3 : false;

  useEffect(() => {
    fetchComments();
  }, [id]);

  useEffect(() => {
    const defineCommentsLength = () => {
      setCommentsLength(postComments.length);
    };
    defineCommentsLength();
  }, [postComments]);

  const primaryClassName = "post-component";
  const customClassName = generateClassName(primaryClassName);

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

  return (
    <section className={primaryClassName} to={`/post/${id}`}>
      <PostHeader postData={postData} />
      <Link to={`/post/${id}`} className={customClassName("caption")}>
        {caption}
      </Link>
      {imageUrl && (
        <Link to={`/post/${id}`} className={customClassName("link-image")}>
          {isImage() && (
            <img
              src={imageUrl}
              alt=""
              className={customClassName("link-image__image")}
            />
          )}
          {isVideo() && (
            <video
              controls
              className={customClassName("link-image__image")}
            >
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
              Binary
            </div>
          )}
          {isDocs() && (
            <div className={customClassName("link-image__docs")}>
              <Icon
                icon="gala:file-document"
                className={customClassName("link-image__docs__icon")}
              />
              Document
            </div>
          )}
        </Link>
      )}
      <PostActions postId={id} updateComments={fetchComments} />
      <PostComments comments={postComments} />
      {hiddenComments && (
        <Link
          to={`/post/${id}`}
          className={customClassName("link-to-hidden-comments")}
        >
          see more {hiddenComments}{" "}
          {hiddenComments > 1 ? "comments" : "comment"}
        </Link>
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Post);

Post.propTypes = {
  postData: PropTypes.shape(),
  token: PropTypes.string,
};
