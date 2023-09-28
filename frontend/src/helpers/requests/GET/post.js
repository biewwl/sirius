import { easyFetch } from "../../fetch";

export const getPost = async (token, id) => {
  const url = `http://10.0.0.98:3010/post/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const fetchPosts = async (token, nick) => {
  const response = await easyFetch(`http://10.0.0.98:3010/posts/${nick}`, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getPostsCount = async (nick) => {
  const url = `http://10.0.0.98:3010/posts/count/${nick}`;
  const response = await easyFetch(url);
  const responseJson = await response.json();
  return responseJson;
};

export const getFeedPosts = async (token) => {
  const url = `http://10.0.0.98:3010/feed`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getPostComments = async (token, id) => {
  const url = `http://10.0.0.98:3010/post/comments/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getPostStatsCount = async (stats, token, id) => {
  const url = `http://10.0.0.98:3010/post/${stats}/count/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getILikeSavePost = async (token, postId, TYPE) => {
  const url = `http://10.0.0.98:3010/post/i-${TYPE}/${postId}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getSavedPosts = async (token) => {
  const url = "http://10.0.0.98:3010/posts/saved/list";
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};
