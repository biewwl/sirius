import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost, getPostComments } from "../../helpers/fetch";
import { useParams } from "react-router-dom";
import HeaderAndAside from "../../components/HeaderAndAside";
import Skeleton from "./skeleton";
import PostActions from "../../components/PostActions";
import PostComments from "../../components/PostComments";
import generateClassName from "../../helpers/generateClassBEM";
import PostHeader from "../../components/PostHeader";
import AsideStories from "../../components/AsideStories";
import GalleryPostFiles from "../../components/GalleryPostFiles";
import "./styles/Post.css";
import "./styles/Post-mobile.css";
import PostRepost from "../../components/PostRepost";
// import PostsGridItem from "../../components/PostsGridItem";

function Post({ token }) {
  const { postId } = useParams();

  // Component States
  const [postData, setPostData] = useState({
    postFiles: [],
  });
  const [loading, setLoading] = useState(true);
  const [postComments, setPostComments] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [repostData, setRepostData] = useState(null);

  // Fetch functions
  const fetchPostData = useCallback(async () => {
    setLoading(true);
    const post = await getPost(token, postId);
    const { repost } = post;

    setPostData(post);
    if (repost) {
      await fetchRepost(repost);
    } else {
      console.log("not", repostData);
      setRepostData(null)
    }
    setLoading(false);
  });

  const fetchComments = useCallback(async () => {
    const comments = await getPostComments(token, postId);
    setPostComments(comments);
  });

  const fetchRepost = async (repost) => {
    const repostData = await getPost(token, repost);
    setRepostData(repostData);
  };

  // UseEffects
  useEffect(() => {
    const fetchResourses = async () => {
      await fetchPostData();
      await fetchComments();
    };
    fetchResourses();
  }, [postId]);

  // Fetched data
  const { caption, id, postFiles = [], repost } = postData;

  const existFiles = postFiles.length > 0;
  const fileUrl = selectedImageUrl ?? "";

  // ClassNames
  const primaryClassName = "post-page";
  const customClassName = generateClassName(primaryClassName);

  const onlyText = fileUrl ? "" : " --only-text";

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

  const isRepost = repostData ? true : false;

  return (
    <div className="div-page">
      <HeaderAndAside />
      {loading ? (
        <Skeleton />
      ) : (
        <div className={`${primaryClassName}${onlyText}`}>
          {existFiles && (
            <GalleryPostFiles
              files={postFiles}
              setSelectedImageUrl={setSelectedImageUrl}
            />
          )}
          <div className={customClassName("data-area")}>
            <PostHeader
              postData={postData}
              isImage={isImage}
              selectedImageUrl={selectedImageUrl}
              repost={{ isRepost, repostId: repost }}
            />
            {caption && (
              <p className={customClassName("data-area__caption")}>{caption}</p>
            )}
            {repostData && (
              <div className={customClassName("data-area__repost")}>
                <PostRepost postData={repostData} />
              </div>
            )}
            <PostActions
              repostId={caption || postFiles.length > 0 ? id : repost}
              postId={id}
              updateComments={fetchComments}
            />
            <PostComments comments={postComments} />
          </div>
        </div>
      )}
      {!existFiles && <AsideStories />}
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
