import { easyFetch, getProfileData } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const getFollows = async (nick, limit, offset, token, TYPE) => {
  try {
    const params = `${nick}?limit=${limit}&offset=${offset}`;
    const URL = {
      followers: `${backendServer}/followers/${params}`,
      following: `${backendServer}/following/${params}`,
    };
    const response = await easyFetch(URL[TYPE], {
      authorization: token,
    });
    if (!response.ok) throw new Error(response.status);
    const responseJson = await response.json();
    const followData = await Promise.all(
      responseJson.map(async (user) => {
        const { date, nick } = user;
        const getFollowData = await getProfileData(token, nick);
        return { date, ...getFollowData };
      })
    );
    return followData;
  } catch ({ message }) {
    return [];
  }
};

export const getFollowsCount = async (nick, TYPE) => {
  const URL = {
    followers: `${backendServer}/followers/count/${nick}`,
    following: `${backendServer}/following/count/${nick}`,
  };
  const response = await easyFetch(URL[TYPE]);
  const responseJson = await response.json();
  return responseJson;
};

export const isFollowing = async (token, nick, TYPE) => {
  const URL = {
    me: `${backendServer}/follow-me/${nick}`,
    user: `${backendServer}/i-follow/${nick}`,
  };
  const response = await easyFetch(URL[TYPE], {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

