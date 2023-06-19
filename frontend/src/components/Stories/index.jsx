import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./styles/Stories.css";
import { Link } from "react-router-dom";

function Stories({ stories }) {
  console.log(stories);

  return (
    <section className="stories">
      {stories.map((story, key) => {
        const { contentUrl, userStory } = story;
        const { avatarUrl, name, nick } = userStory;

        return (
          <section key={key} className="story">
            <div className="story__content">
              <img
                src={contentUrl}
                alt=""
                className="story__content__preview"
              />
            </div>
            <section className="story__owner">
              <img src={avatarUrl} alt="" className="story__owner__avatar" />
              <Link to={`/p/${nick}`} className="story__owner__name">{name}</Link>
            </section>
          </section>
        );
      })}
    </section>
  );
}

export default connect()(Stories);

Stories.propTypes = {
  stories: PropTypes.shape(),
};
