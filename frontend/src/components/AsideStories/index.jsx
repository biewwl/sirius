import React, { useEffect, useState } from "react";
import { getFeedStories } from "../../helpers/requests/GET/story";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { organizeStories, sortStories } from "../../helpers/organizeStories";
import Story from "../Story";
import "./styles/AsideStories.css";
import "./styles/AsideStories-mobile.css";

function AsideStories({ token }) {
  const [feedStories, setFeedStories] = useState([]);
  const [firstStory, setFirstStory] = useState([]);

  useEffect(() => {
    const getStories = async () => {
      const stories = await getFeedStories(token);
      const sortedStories = sortStories(stories);
      setFeedStories(sortedStories);
    };
    getStories();
  }, []);

  useEffect(() => {
    const filterStories = () => {
      const newStories = organizeStories(feedStories);
      setFirstStory(newStories);
    };
    filterStories();
  }, [feedStories]);

  const isLogged = token;

  if (!isLogged) return <></>;

  return (
    <section className="stories-right-aside">
      <section className="stories-aside">
        <span className="stories-aside__title">Stories</span>
        {firstStory.map((story, key) => (
          <Story
            key={key}
            stories={feedStories}
            storyData={story}
            width="100%"
            height="120px"
          />
        ))}
      </section>
    </section>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(AsideStories);

AsideStories.propTypes = {
  token: PropTypes.string,
};
