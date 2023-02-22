import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import HeaderAndAside from "../../components/HeaderAndAside";
import PropTypes from "prop-types";
import { getFeedPosts } from "../../helpers/fetch";
import Posts from "../../components/Posts";
import "./styles/Home.css";
import SectionTitle from "../../components/SectionTitle";
import NewPost from "../../components/NewPost";

function Home({ token }) {
  const [feedPosts, setFeedPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getFeedPosts(token);
      setFeedPosts(posts);
    };
    getPosts();
  }, []);

  return (
    <div className="div-page">
      <HeaderAndAside />
      <main className="page_home">
        <NewPost />
        <SectionTitle title="Posts" icon="gridicons:posts" />
        <Posts posts={feedPosts} />
      </main>
    </div>
  );
}
const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Home);

Home.propTypes = {
  token: PropTypes.string,
};
