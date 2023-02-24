import { easyFetch } from "../../helpers/fetch";

export const dataPost = async (token, id) => {
  const url = `http://localhost:3010/data/post/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const listPosts = async (token, nick) => {
  const url = `http://localhost:3010/list/posts/${nick}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const countPosts = async (token, nick) => {
  const url = `http://localhost:3010/count/posts/${nick}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const listFeed = async (token) => {
  const url = `http://localhost:3010/list/feed`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};
