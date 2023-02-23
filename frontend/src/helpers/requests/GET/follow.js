import { easyFetch, getProfileData } from "../../fetch";

export const getFollows = async (nick, limit, offset, token, TYPE) => {
  try {
    const params = `${nick}?limit=${limit}&offset=${offset}`;
    const URL = {
      followers: `http://localhost:3010/followers/${params}`,
      following: `http://localhost:3010/following/${params}`,
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
    followers: `http://localhost:3010/followers/count/${nick}`,
    following: `http://localhost:3010/following/count/${nick}`,
  };
  const response = await easyFetch(URL[TYPE]);
  const responseJson = await response.json();
  return responseJson;
};

export const isFollowing = async (token, nick, TYPE) => {
  const URL = {
    me: `http://localhost:3010/follow-me/${nick}`,
    user: `http://localhost:3010/i-follow/${nick}`,
  };
  const response = await easyFetch(URL[TYPE], {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

