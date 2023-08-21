import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import HeaderAndAside from "../../components/HeaderAndAside";
import PropTypes from "prop-types";
import { getFeedPosts } from "../../helpers/fetch";
import Posts from "../../components/Posts";
import Stories from "../../components/Stories";
import generateClassName from "../../helpers/generateClassBEM";
import { Icon } from "@iconify/react";
import AsideStories from "../../components/AsideStories";
import "./styles/Home.css";
import "./styles/Home-mobile.css";

function Home({ token, accountDataREDUX }) {
  const [feedPosts, setFeedPosts] = useState([]);

  const { name, avatarUrl } = accountDataREDUX;

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getFeedPosts(token);
      setFeedPosts(posts);
    };
    getPosts();
  }, []);

  const primaryClassName = "home-page";
  const customClassName = generateClassName(primaryClassName);

  const firstName = name ? name.split(" ")[0] : "";

  return (
    <div className="div-page">
      <HeaderAndAside />
      <main className={primaryClassName}>
        {/* <NewPost /> */}
        <Stories />
        <section className={customClassName("new-post")}>
          <div className={customClassName("new-post__avatar-and-name")}>
            <img
              src={avatarUrl}
              alt=""
              className={customClassName("new-post__avatar-and-name__avatar")}
            />
            <h4 className={customClassName("new-post__avatar-and-name__name")}>
              What&apos;s new, {firstName}?
            </h4>
          </div>
          <button className={customClassName("new-post__action-btn")}>
            <Icon icon="pajamas:link" />
            <span className={customClassName("new-post__action-btn__text")}>
              Post it!
            </span>
          </button>
        </section>
        <Posts posts={feedPosts} />
      </main>
      {/* <section className="home-right-aside"></section> */}
      <AsideStories />
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
  accountDataREDUX: PropTypes.shape(),
};
