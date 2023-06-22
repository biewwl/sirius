import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import {
  getStoriesByNick,
  getStoryById,
} from "../../helpers/requests/GET/story";
import useTimer from "../../hooks/useTimer";
import { verifiedType } from "../../helpers";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles/Story.css";
import storiesList from "../../helpers/storiesList";
import generateClassName from "../../helpers/generateClassBEM";

function Story({ token }) {
  const params = useParams();
  const navigate = useNavigate();

  const { storyId } = params;

  const [storyData, setStoryData] = useState({
    contentUrl: "",
    userStory: {
      avatarUrl: "",
      name: "",
      nick: "",
    },
  });

  const [storiesStats, setStoriesStats] = useState({
    length: 1,
    currentIndex: 0,
  });

  const { contentUrl, userStory, date } = storyData;
  const { avatarUrl, name, accountVerified, nick } = userStory;

  const [currentTimer, currentFormat] = useTimer(date);
  const { icon, text } = verifiedType(accountVerified);
  const isVerified = accountVerified !== "none";

  const handleCloseStory = () => {
    const prevPage = storiesList.getPrevPage();
    navigate(prevPage);
  };

  const handlePrevStory = () => {
    const prev = storiesList.getPrevId(Number(storyId));
    if (prev) {
      navigate(`/story/${prev}`);
    }
  };

  const handleNextStory = () => {
    const next = storiesList.getNextId(Number(storyId));
    if (next) {
      navigate(`/story/${next}`);
    }
  };

  useEffect(() => {
    const getStoryData = async () => {
      const data = await getStoryById(token, storyId);
      setStoryData(data);
    };
    const getStoriesFromUser = async () => {
      if (nick) {
        const data = await getStoriesByNick(token, nick);
        const length = data.length;
        const currentIndex = data.findIndex(
          (story) => story.id === Number(storyId)
        );

        setStoriesStats({ length, currentIndex });
        // setStoriesFromTheSameUser(data);
      }
    };
    getStoryData();
    getStoriesFromUser();
  }, [params, userStory.nick]);

  const primaryClassName = "story-view";
  const customClassName = generateClassName(primaryClassName);

  const countDetails = () => {
    const items = [];
    for (let i = 0; i < storiesStats.length; i += 1) {
      items.push("");
    }
    const details = items.map((story, i) => {
      if (i <= storiesStats.currentIndex) {
        return <div className="story-detail viewed-story" key={i}></div>;
      }
      return <div className="story-detail" key={i}></div>;
    });
    return details;
  };

  return (
    <>
      <section className={primaryClassName}>
      <div className="viewed-details">{countDetails()}</div>

        <div className={customClassName("header")}>
          <Link to={`/p/${nick}`}>
            <img
              src={avatarUrl}
              alt=""
              className={customClassName("header__user-avatar")}
            />
          </Link>
          <div className={customClassName("header__user-name-time")}>
            <Link to={`/p/${nick}`}>
              <h4 className={customClassName("header__user-name-time__name")}>
                {name}
                {isVerified && (
                  <div
                    title={text}
                    className={customClassName(
                      "header__user-name-time__name__verified"
                    )}
                  >
                    <Icon
                      icon={icon}
                      className={`verified-${accountVerified}`}
                    />
                  </div>
                )}
              </h4>
            </Link>
            <span className={customClassName("header__user-name-time__time")}>
              {currentTimer}
              {currentFormat}
            </span>
          </div>
          <button
            className={customClassName("header__exit-btn")}
            onClick={handleCloseStory}
          >
            <Icon icon="mi:close" />
          </button>
        </div>
        <div className={customClassName("content-and-control")}>
          <img
            src={contentUrl}
            alt=""
            className={customClassName("content-and-control__content")}
          />
          <section className={customClassName("content-and-control__control")}>
            <div
              className={customClassName("content-and-control__control__prev")}
              onClick={handlePrevStory}
            />
            <div
              className={customClassName("content-and-control__control__next")}
              onClick={handleNextStory}
            />
          </section>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Story);

Story.propTypes = {
  token: PropTypes.string,
};
