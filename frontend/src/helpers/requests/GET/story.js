import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const getFeedStories = async (token) => {
  const url = `${backendServer}/stories/feed`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getStoryById = async (token, storyId) => {
  const url = `${backendServer}/story/${storyId}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getStoriesByNick = async (token, nick) => {
  const url = `${backendServer}/stories/${nick}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};
