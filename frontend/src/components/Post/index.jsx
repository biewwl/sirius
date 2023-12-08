import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostActions from "../PostActions";
import PostComments from "../PostComments";
import { getPost, getPostComments } from "../../helpers/fetch";
import { connect } from "react-redux";
import generateClassName from "../../helpers/generateClassBEM";
import PostHeader from "../PostHeader";
import GalleryPostFiles from "../GalleryPostFiles";
import "./styles/Post.css";
import "./styles/Post-mobile.css";
import PostRepost from "../PostRepost";
// import UserAvatarStory from "../UserAvatarStory";

function Post({ postData, token, setup }) {
  const { caption, id, postFiles = [], repost } = postData;

  const [postComments, setPostComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [repostedData, setRepostedData] = useState(null);

  const fetchComments = useCallback(async () => {
    const comments = await getPostComments(token, id);
    setPostComments(comments);
  });

  const getRepost = useCallback(async () => {
    if (repost) {
      const postReposted = await getPost(token, repost);
      if (postReposted.error) return setRepostedData("exclude");
      setRepostedData(postReposted);
    }
  });

  const hiddenComments = commentsLength > 3 ? commentsLength - 3 : false;

  const existFiles = postFiles.length > 0;
  const fileUrl = selectedImageUrl ?? "";

  useEffect(() => {
    const fetchData = async () => {
      await fetchComments();
      await getRepost();
    };
    fetchData();
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

  const isRepost = repostedData && repostedData !== "exclude";

  const repostClass = isRepost ? "--repost" : "--normal";

  return (
    <div className={`repost-view ${repostClass}`}>
      <section className={primaryClassName} to={`/post/${id}`}>
        <PostHeader
          postData={postData}
          isImage={isImage}
          setup={setup}
          selectedImageUrl={selectedImageUrl}
          repost={{ isRepost, repostId: repost }}
        />
        {caption && (
          <Link to={`/post/${id}`} className={customClassName("caption")}>
            {caption}
          </Link>
        )}
        {existFiles && (
          <GalleryPostFiles
            files={postFiles}
            setSelectedImageUrl={setSelectedImageUrl}
            postId={id}
            objectPosition="center"
          />
        )}
        {isRepost && <PostRepost postData={repostedData} />}
        {repostedData === "exclude" && (
          <div className="exclude-post">This post has been deleted</div>
        )}
        <PostActions
          postId={id}
          repostId={caption || postFiles.length > 0 ? id : repost}
          updateComments={fetchComments}
        />
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Post);

Post.propTypes = {
  postData: PropTypes.shape(),
  token: PropTypes.string,
  setup: PropTypes.func,
};
