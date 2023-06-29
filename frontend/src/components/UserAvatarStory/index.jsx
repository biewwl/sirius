import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getStoriesByNick } from "../../helpers/requests/GET/story";
import "./styles/UserAvatarStory.css";
import storiesList from "../../helpers/storiesList";

function UserAvatarStory({
  nick,
  avatarUrl,
  size,
  className = "",
  token,
  borderWidth = "3",
  borderColor
}) {
  const [stories, setStories] = useState([]);

  const haveStory = stories.length > 0;

  const navigate = useNavigate();
  const location = useLocation();

  const handleStoryClick = () => {
    if (haveStory) {
      storiesList.set(stories);
      storiesList.setPrevPage(location.pathname);
      navigate(`/story/${stories[0].id}`);
    }
  };

  useEffect(() => {
    const fetchStoriesByNick = async () => {
      const fetchStories = await getStoriesByNick(token, nick);
      setStories(fetchStories);
    };
    fetchStoriesByNick();
  }, []);

  const classNameStory = haveStory ? "--with-story" : "--without-story";

  return (
    <>
      <img
        src={avatarUrl}
        alt=""
        className={`user-story-avatar-container__avatar${classNameStory}${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderWidth: `${borderWidth}px`,
          background: borderColor,
        }}
        onClick={handleStoryClick}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(UserAvatarStory);

UserAvatarStory.propTypes = {
  nick: PropTypes.string,
  avatarUrl: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  token: PropTypes.string,
  borderWidth: PropTypes.string,
  borderColor: PropTypes.string,
};
