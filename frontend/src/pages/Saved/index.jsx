import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import HeaderAndAside from "../../components/HeaderAndAside";
import SectionTitle from "../../components/SectionTitle";
import { listPostsSaved } from "../../helpers/fetch";
import PropTypes from "prop-types";
import Posts from "../../components/Posts";
import PostsGrid from "../../components/PostsGrid";
import "./styles/Saved.css";

function Saved({ token }) {
  const [gridView, setGridView] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);

  const fetchSavedPosts = async () => {
    const posts = await listPostsSaved(token);
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
            gridView ? "ri:layout-row-line" : "material-symbols:grid-on-sharp"
          }
          onClickIcon={handleChangeView}
        />
        {!gridView && <Posts posts={formattedPosts} />}
        {gridView && <PostsGrid posts={formattedPosts} />}
      </div>
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
