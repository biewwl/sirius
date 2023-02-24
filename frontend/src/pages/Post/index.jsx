import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { dataPost, listPostComments } from "../../helpers/fetch";
import { useParams } from "react-router-dom";
import HeaderAndAside from "../../components/HeaderAndAside";
import Skeleton from "./skeleton";
import PostActions from "../../components/PostActions";
import PostComments from "../../components/PostComments";
import generateClassName from "../../helpers/generateClassBEM";
import PostHeader from "../../components/PostHeader";
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
    const post = await dataPost(token, postId);
    setPostData(post);
    setLoading(false);
  });

  const fetchComments = useCallback(async () => {
    const comments = await listPostComments(token, postId);
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

  return (
    <div className="div-page">
      <HeaderAndAside />
      {loading ? (
        <Skeleton />
      ) : (
        <div className={primaryClassName}>
          <div className={customClassName("image-area")}>
            <img
              src={imageUrl}
              alt=""
              className={customClassName("image-area__image")}
            />
          </div>
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
