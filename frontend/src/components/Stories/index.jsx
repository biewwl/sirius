import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Story from "../Story";
import { Icon } from "@iconify/react";
import "./styles/Stories.css";
import "./styles/Stories-NewStoryBackground.css";

function Stories({ stories }) {
  const [firstStory, setFirstStory] = useState([]);

  useEffect(() => {
    const filterStories = () => {
      const newStories = [];
      stories.forEach((story) => {
        const { userStory } = story;
        const { nick } = userStory;
        const existStoryByUser = newStories.some(
          (s) => s.userStory.nick === nick
        );

        if (!existStoryByUser) newStories.push(story);
      });
      setFirstStory(newStories);
    };
    filterStories();
  }, [stories]);

  return (
    <section className="stories">
      <section className="stories__create">
        <Icon icon="basil:plus-outline" className="stories__create__icon"/>
        <span className="stories__create__text">Add Story</span>
      </section>
      {firstStory.map((story, key) => (
        <Story key={key} stories={stories} storyData={story} />
      ))}
    </section>
  );
}

export default connect()(Stories);

Stories.propTypes = {
  stories: PropTypes.array,
};
