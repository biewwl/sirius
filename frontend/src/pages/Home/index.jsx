import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import HeaderAndAside from "../../components/HeaderAndAside";
import PropTypes from "prop-types";
import { getFeedPosts } from "../../helpers/fetch";
import Posts from "../../components/Posts";
import Stories from "../../components/Stories";
import AsideStories from "../../components/AsideStories";
import NewPost from "../../components/NewPost";
import "./styles/Home.css";
import "./styles/Home-mobile.css";

function Home({ token }) {
  const [feedPosts, setFeedPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getFeedPosts(token);
      setFeedPosts(posts);
    };
    getPosts();
  }, []);

  const primaryClassName = "home-page";

  return (
    <div className="div-page">
      <HeaderAndAside />
      <main className={primaryClassName}>
        <Stories />
        <NewPost />
        <Posts posts={feedPosts} />
      </main>
      {/* <section className="home-right-aside"></section> */}
      <AsideStories />
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Home);

Home.propTypes = {
  token: PropTypes.string,
};
