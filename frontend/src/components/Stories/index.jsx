import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserAvatarStory from "../UserAvatarStory";
import { Icon } from "@iconify/react";
import { verifiedType } from "../../helpers";
import storiesList from "../../helpers/storiesList";
import "./styles/Stories.css";

function Stories({ stories }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [firstStory, setFirstStory] = useState([]);

  const handleStoryClick = (storyId) => {
    storiesList.setPrevPage(location.pathname);
    storiesList.set(stories);
    navigate(`/story/${storyId}`);
  };

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
      {firstStory.map((story, key) => {
        const { contentUrl, userStory, id } = story;
        const { avatarUrl, name, nick, accountVerified } = userStory;

        const { icon, text } = verifiedType(accountVerified);
        const isVerified = accountVerified !== "none";

        return (
          <section
            key={key}
            className="story"
            onClick={() => handleStoryClick(id)}
          >
            <div className="story__content">
              <img
                src={contentUrl}
                alt=""
                className="story__content__preview"
              />
            </div>
            <section className="story__owner">
              <UserAvatarStory
                nick={nick}
                avatarUrl={avatarUrl}
                size="60"
                className=" story__owner__avatar"
              />
              <Link to={`/p/${nick}`} className="story__owner__name">
                {name}
                {isVerified && (
                  <div title={text} className="story__owner__name__verified">
                    <Icon
                      icon={icon}
                      className={`verified-${accountVerified}`}
                    />
                  </div>
                )}
              </Link>
            </section>
          </section>
        );
      })}
    </section>
  );
}

export default connect()(Stories);

Stories.propTypes = {
  stories: PropTypes.array,
};
