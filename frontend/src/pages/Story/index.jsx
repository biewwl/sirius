import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { getStoryById } from "../../helpers/requests/GET/story";
import useTimer from "../../hooks/useTimer";
import { verifiedType } from "../../helpers";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles/Story.css";
import storiesList from "../../helpers/storiesList";

function Story({ token }) {
  const params = useParams();
  const navigate = useNavigate();

  const { storyId } = params;

  const [storyData, setStoryData] = useState({
    contentUrl: "",
    userStory: {
      avatarUrl: "",
      name: "",
    },
  });

  const { contentUrl, userStory, date } = storyData;
  const { avatarUrl, name, accountVerified, nick } = userStory;

  const [currentTimer, currentFormat] = useTimer(date);
  const { icon, text } = verifiedType(accountVerified);
  const isVerified = accountVerified !== "none";

  const handleCloseStory = () => {
    const prevPage = storiesList.getPrevPage();
    navigate(prevPage);
    console.log(prevPage);
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
    getStoryData();
  }, [params]);

  return (
    <>
      <section className="story-view">
        <div className="story-view__header">
          <Link to={`/p/${nick}`}>
            <img
              src={avatarUrl}
              alt=""
              className="story-view__header__user-avatar"
            />
          </Link>
          <div className="story-view__header__user-name-time">
            <Link to={`/p/${nick}`}>
              <h4 className="story-view__header__user-name-time__name">
                {name}
                {isVerified && (
                  <div
                    title={text}
                    className="story-view__header__user-name-time__name__verified"
                  >
                    <Icon
                      icon={icon}
                      className={`verified-${accountVerified}`}
                    />
                  </div>
                )}
              </h4>
            </Link>
            <span className="story-view__header__user-name-time__time">
              {currentTimer}
              {currentFormat}
            </span>
          </div>
          <button
            className="story-view__header__exit-btn"
            onClick={handleCloseStory}
          >
            <Icon icon="mi:close" />
          </button>
        </div>
        <div className="story-view__content-and-control">
          <img
            src={contentUrl}
            alt=""
            className="story-view__content-and-control__content"
          />
          <section className="story-view__content-and-control__control">
            <div
              className="story-view__content-and-control__control__prev"
              onClick={handlePrevStory}
            />
            <div
              className="story-view__content-and-control__control__next"
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
