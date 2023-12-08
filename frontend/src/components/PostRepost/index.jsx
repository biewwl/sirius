import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import generateClassName from "../../helpers/generateClassBEM";
import PostHeader from "../PostHeader";
import GalleryPostFiles from "../GalleryPostFiles";
import "./styles/Post.css";
import "./styles/Post-mobile.css";
// import UserAvatarStory from "../UserAvatarStory";

function PostRepost({ postData, setup }) {
  const { caption, id, postFiles = [] } = postData;

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const existFiles = postFiles.length > 0;
  const fileUrl = selectedImageUrl ?? "";

  const primaryClassName = "repost-component";
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

  // console.log(postData);

  return (
    <section className={primaryClassName} to={`/post/${id}`}>
      <PostHeader
        postData={postData}
        isImage={isImage}
        setup={setup}
        selectedImageUrl={selectedImageUrl}
      />
      <Link to={`/post/${id}`} className={customClassName("caption")}>
        {caption}
      </Link>
      {existFiles && (
        <GalleryPostFiles
          files={postFiles}
          setSelectedImageUrl={setSelectedImageUrl}
          objectPosition="center"
        />
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(PostRepost);

PostRepost.propTypes = {
  postData: PropTypes.shape(),
  token: PropTypes.string,
  setup: PropTypes.func,
};
