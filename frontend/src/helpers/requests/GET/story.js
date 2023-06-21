import { easyFetch } from "../../fetch";

export const getFeedStories = async (token) => {
  const url = `http://localhost:3010/stories/feed`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getStoryById = async (token, storyId) => {
  const url = `http://localhost:3010/story/${storyId}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getStoriesByNick = async (token, nick) => {
  const url = `http://localhost:3010/stories/${nick}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};
