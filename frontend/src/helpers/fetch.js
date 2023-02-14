export const easyFetch = async (url, headers, method, body) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  };
  if (!method) {
    delete options.method;
  }
  if (!body) {
    delete options.body;
  }
  const response = await fetch(url, options);
  return response;
};

//
// Login and Register
//

export const login = async ({ nick, password }) => {
  const response = await easyFetch("http://localhost:3010/login", {}, "POST", {
    nick,
    password,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const register = async ({ name, nick, email, password }) => {
  const response = await easyFetch(
    "http://localhost:3010/register",
    {},
    "POST",
    {
      name,
      nick,
      email,
      password,
    }
  );
  const responseJson = await response.json();
  return responseJson;
};

//
// Follows
//

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

export const followOrUnfollowUser = async (token, nick, TYPE) => {
  const response = await easyFetch(
    `http://localhost:3010/${TYPE}/${nick}`,
    { authorization: token },
    "POST"
  );
  const responseJson = await response.json();

  return responseJson;
};

//
// Block
//

export const blockOrUnblockUser = async (token, nick, TYPE) => {
  const URL = {
    block: `http://localhost:3010/block/${nick}`,
    unblock: `http://localhost:3010/unblock/${nick}`,
  };
  const response = await easyFetch(URL[TYPE], { authorization: token }, "POST");
  const responseJson = await response.json();
  return responseJson;
};

export const getIBlockUser = async (token, nick) => {
  const response = await easyFetch(`http://localhost:3010/i-block/${nick}`, {
    authorization: token,
  });
  if (response.status !== 200) return false;
  const responseJson = await response.json();
  return responseJson;
};

//
// Data
//

const getData = async (url, token) => {
  try {
    const response = await easyFetch(url, {
      authorization: token,
      "Cache-Control": "no-cache",
    });
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
    const responseJson = await response.json();
    const { nick } = responseJson;
    const followersCount = await getFollowsCount(nick, "followers");
    const followingCount = await getFollowsCount(nick, "following");
    const postsCount = 0;
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
  getData("http://localhost:3010/account/data", token);

export const getProfileData = async (token, nick) =>
  getData(`http://localhost:3010/profile/${nick}`, token);
