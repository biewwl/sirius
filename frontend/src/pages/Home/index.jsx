import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import HeaderAndAside from "../../components/HeaderAndAside";
import PropTypes from "prop-types";
import { getFeedPosts } from "../../helpers/fetch";
import Posts from "../../components/Posts";
import "./styles/Home.css";
import SectionTitle from "../../components/SectionTitle";
// import NewPost from "../../components/NewPost";
import Stories from "../../components/Stories";
// import generateClassName from "../../helpers/generateClassBEM";

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
  // const customClassName = generateClassName(primaryClassName);

  return (
    <div className="div-page">
      <HeaderAndAside />
      <main className={primaryClassName}>
        {/* <NewPost /> */}
        <SectionTitle
          title="Stories"
          icon="solar:posts-carousel-horizontal-line-duotone"
        />
        <Stories stories={feedPosts} />
        <SectionTitle
          title="Posts"
          icon="solar:posts-carousel-vertical-line-duotone"
        />
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
