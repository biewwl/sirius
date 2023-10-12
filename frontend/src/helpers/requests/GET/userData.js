import { easyFetch, getFollowsCount, getPostsCount } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

const getData = async (url, token) => {
  try {
    const response = await easyFetch(url, {
      authorization: token,
    });
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
    const responseJson = await response.json();
    const { nick } = responseJson;
    const followersCount = await getFollowsCount(nick, "followers");
    const followingCount = await getFollowsCount(nick, "following");
    const postsCount = await getPostsCount(nick);
    return { ...responseJson, followersCount, followingCount, postsCount };
  } catch ({ message }) {
    if (message === "YOU HAVE BEEN BLOCKED") {
      return { error: "blocked" };
    }
    if (message === "nick not Found!") {
      return { error: "userInexistent" };
    }
  }
};

export const getLoggedData = async (token) =>
  getData(`${backendServer}/account/data`, token);

export const getProfileData = async (token, nick) =>
  getData(`${backendServer}/profile/${nick}`, token);
