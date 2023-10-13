import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import HeaderAndAside from "../../components/HeaderAndAside";
import SectionTitle from "../../components/SectionTitle";
import { getSavedPosts } from "../../helpers/fetch";
import PropTypes from "prop-types";
import Posts from "../../components/Posts";
import PostsGrid from "../../components/PostsGrid";
import AsideStories from "../../components/AsideStories";
import "./styles/Saved.css";
import "./styles/Saved-mobile.css";

function Saved({ token }) {
  const [gridView, setGridView] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);

  const fetchSavedPosts = async () => {
    const posts = await getSavedPosts(token);
    setSavedPosts(posts);
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  const handleChangeView = () => {
    setGridView(!gridView);
  };

  const formattedPosts = savedPosts.map((post) => post.postSaved);

  return (
    <div className="div-page">
      <HeaderAndAside />
      <div className="page-saved">
        <SectionTitle
          title="Saved"
          icon={
            gridView ? "solar:posts-carousel-vertical-line-duotone" : "eva:grid-fill"
          }
          onClickIcon={handleChangeView}
        />
        {!gridView && <Posts posts={formattedPosts} />}
        {gridView && <PostsGrid posts={formattedPosts} />}
      </div>
      <AsideStories />
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Saved);

Saved.propTypes = {
  token: PropTypes.string,
};
