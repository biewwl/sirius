import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost, getPostComments } from "../../helpers/fetch";
import { Link, useParams } from "react-router-dom";
import HeaderAndAside from "../../components/HeaderAndAside";
import Skeleton from "./skeleton";
import PostActions from "../../components/PostActions";
import PostComments from "../../components/PostComments";
import generateClassName from "../../helpers/generateClassBEM";
import PostHeader from "../../components/PostHeader";
import AsideStories from "../../components/AsideStories";
import { getExtension } from "../../helpers/fileExtensions";
import { FileIcon } from "react-file-icon";
import "./styles/Post.css";
import "./styles/Post-mobile.css";

function Post({ token }) {
  const { postId } = useParams();

  // Component States
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [postComments, setPostComments] = useState([]);

  // Fetch functions
  const fetchPostData = useCallback(async () => {
    setLoading(true);
    const post = await getPost(token, postId);
    setPostData(post);
    setLoading(false);
  });

  const fetchComments = useCallback(async () => {
    const comments = await getPostComments(token, postId);
    setPostComments(comments);
  });

  // UseEffects
  useEffect(() => {
    fetchPostData();
    fetchComments();
  }, [postId]);

  // Fetched data
  const { caption, imageUrl, id } = postData;

  // ClassNames
  const primaryClassName = "post-page";
  const customClassName = generateClassName(primaryClassName);

  const onlyText = imageUrl ? "" : " --only-text";

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

  const url = imageUrl ?? "";

  return (
    <div className="div-page">
      <HeaderAndAside />
      {loading ? (
        <Skeleton />
      ) : (
        <div className={`${primaryClassName}${onlyText}`}>
          {imageUrl && (
            <div className={customClassName("image-area")}>
              {isImage() && (
                <img
                  src={imageUrl}
                  alt=""
                  className={customClassName("image-area__image")}
                />
              )}
              {isVideo() && (
                <video
                  controls
                  className={customClassName("image-area__image")}
                >
                  <source src={imageUrl} type="video/mp4" />
                  Seu navegador não suporta a exibição de vídeos.
                </video>
              )}
              {isOther() && (
                <Link
                  to={imageUrl}
                  target="blank"
                  className={customClassName("image-area__others")}
                >
                  <FileIcon
                    labelColor="var(--accent)"
                    glyphColor="var(--accent)"
                    extension={getExtension(url)}
                    type="binary"
                  />
                </Link>
              )}
              {isDocs() && (
                <Link
                  to={imageUrl}
                  target="blank"
                  className={customClassName("image-area__docs")}
                >
                  <FileIcon
                    labelColor="var(--accent)"
                    glyphColor="var(--accent)"
                    extension={getExtension(url)}
                    type="document"
                  />
                </Link>
              )}
            </div>
          )}
          <div className={customClassName("data-area")}>
            <PostHeader
              postData={postData}
              primaryClassName={customClassName("data-area")}
            />
            <p className={customClassName("data-area__caption")}>{caption}</p>
            <PostActions postId={id} updateComments={fetchComments} />
            <PostComments comments={postComments} />
          </div>
        </div>
      )}
      {!imageUrl && <AsideStories />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Post);

Post.propTypes = {
  token: PropTypes.string,
};
