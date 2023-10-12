import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const getPost = async (token, id) => {
  const url = `${backendServer}/post/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const fetchPosts = async (token, nick) => {
  const response = await easyFetch(`${backendServer}/posts/${nick}`, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getPostsCount = async (nick) => {
  const url = `${backendServer}/posts/count/${nick}`;
  const response = await easyFetch(url);
  const responseJson = await response.json();
  return responseJson;
};

export const getFeedPosts = async (token) => {
  const url = `${backendServer}/feed`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getPostComments = async (token, id) => {
  const url = `${backendServer}/post/comments/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getPostStatsCount = async (stats, token, id) => {
  const url = `${backendServer}/post/${stats}/count/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getILikeSavePost = async (token, postId, TYPE) => {
  const url = `${backendServer}/post/i-${TYPE}/${postId}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getSavedPosts = async (token) => {
  const url = `${backendServer}/posts/saved/list`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};
