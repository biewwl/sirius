import { easyFetch } from "../../helpers/fetch";

export const listFollowing = async (options) => {
  const { nick, limit, offset, token } = options;
  const params = `${nick}?limit=${limit}&offset=${offset}`;
  const url = `http://localhost:3010/list/following/${params}`;
  const response = await easyFetch(url, { authorization: token });
  const responseJson = await response.json();
  return responseJson;
};

export const listFollowers = async (options) => {
  const { nick, limit, offset, token } = options;
  const params = `${nick}?limit=${limit}&offset=${offset}`;
  const url = `http://localhost:3010/list/followers/${params}`;
  const response = await easyFetch(url, { authorization: token });
  const responseJson = await response.json();
  return responseJson;
};

export const countFollowing = async (options) => {
  const { nick, token } = options;
  const url = `http://localhost:3010/count/following/${nick}`;
  const response = await easyFetch(url, { authorization: token });
  const responseJson = await response.json();
  return responseJson;
};

export const countFollowers = async (options) => {
  const { nick, token } = options;
  const url = `http://localhost:3010/count/followers/${nick}`;
  const response = await easyFetch(url, { authorization: token });
  const responseJson = await response.json();
  return responseJson;
};

export const checkIFollow = async (options) => {
  const { token, nick } = options;
  const url = `http://localhost:3010/check/i-follow/${nick}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const checkFollowMe = async (options) => {
  const { token, nick } = options;
  const url = `http://localhost:3010/check/follow-me/${nick}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const createFollow = async (options) => {
  const { token, nick } = options;
  const url = `http://localhost:3010/create/follow/${nick}`;
  await easyFetch(url, { authorization: token }, "POST");
};

export const deleteFollow = async (options) => {
  const { token, nick } = options;
  const url = `http://localhost:3010/delete/follow/${nick}`;
  await easyFetch(url, { authorization: token }, "DELETE");
};
