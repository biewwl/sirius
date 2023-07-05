import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Story from "../Story";
import { Icon } from "@iconify/react";
import "./styles/Stories.css";
// import "./styles/Stories-NewStoryBackground.css";
import { organizeStories, sortStories } from "../../helpers/organizeStories";
import { getFeedStories } from "../../helpers/requests/GET/story";

function Stories({ token }) {
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

  return (
    <section className="stories">
      <section className="stories__create">
        <div className="stories__create__icon__border">
          <Icon icon="pepicons-pop:plus" className="stories__create__icon" />
        </div>
        <span className="stories__create__text">Add Story</span>
      </section>
      {firstStory.map((story, key) => (
        <Story key={key} stories={feedStories} storyData={story} />
      ))}
    </section>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Stories);

Stories.propTypes = {
  token: PropTypes.string,
};
