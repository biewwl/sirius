import React from "react";
import { verifiedType } from "../../helpers";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserAvatarStory from "../UserAvatarStory";
import storiesList from "../../helpers/storiesList";
import PropTypes from "prop-types";
import "./styles/Story.css";

function Story({ stories, storyData, width, height }) {
  const { contentUrl, userStory, id } = storyData;
  const { avatarUrl, name, nick, accountVerified } = userStory;

  const { icon, text } = verifiedType(accountVerified);
  const isVerified = accountVerified !== "none";

  const navigate = useNavigate();
  const location = useLocation();

  const handleStoryClick = (storyId) => {
    storiesList.setPrevPage(location.pathname);
    storiesList.set(stories);
    navigate(`/story/${storyId}`);
  };

  return (
    <section
      className="story"
      onClick={() => handleStoryClick(id)}
      style={{
        width: `${width}`,
        height: `${height}`,
        minWidth: `${width}`,
      }}
    >
      <div
        className="story__content"
        style={{
          width: `${width}`,
          height: `${height}`,
          minWidth: `${width}`,
        }}
      >
        <img src={contentUrl} alt="" className="story__content__preview" />
      </div>
      <UserAvatarStory
        nick={nick}
        avatarUrl={avatarUrl}
        size="35"
        borderWidth="2"
        borderColor="#fff"
        className=" story__owner__avatar"
        borderRadius="0.75em"
      />
      <section className="story__owner">
        <Link to={`/p/${nick}`} className="story__owner__name__and__verified">
          <span className="story__owner__name__and__verified__name">
            {name}
          </span>
          {isVerified && (
            <div
              title={text}
              className="story__owner__name__and__verified__verified"
            >
              <Icon icon={icon} className={`verified-${accountVerified}`} />
            </div>
          )}
        </Link>
      </section>
    </section>
  );
}

export default Story;

Story.propTypes = {
  storyData: PropTypes.shape(),
  stories: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
};
