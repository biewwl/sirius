export const easyFetch = async (url, headers, method, body) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
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
    console.log(message);
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

export const followOrUnfollowUser = async (token, nick, TYPE) => {
  await easyFetch(
    `http://localhost:3010/${TYPE}/${nick}`,
    { authorization: token },
    "POST"
  );
};

//
// Block
//

export const blockOrUnblockUser = async (token, nick, TYPE) => {
  const URL = {
    block: `http://localhost:3010/block/${nick}`,
    unblock: `http://localhost:3010/unblock/${nick}`,
  };
  await easyFetch(URL[TYPE], { authorization: token }, "POST");
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
  getData("http://localhost:3010/account/data", token);

export const getProfileData = async (token, nick) =>
  getData(`http://localhost:3010/profile/${nick}`, token);

export const searchUsers = async (query, limit, offset, token) => {
  const response = await easyFetch(
    `http://localhost:3010/search?query=${query}&limit=${limit}&offset=${offset}`,
    {
      authorization: token,
    }
  );
  const responseJson = await response.json();
  return responseJson;
};

// Posts

export const fetchPosts = async (token, nick) => {
  const response = await easyFetch(`http://localhost:3010/posts/${nick}`, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getPostsCount = async (nick) => {
  const url = `http://localhost:3010/posts/count/${nick}`;
  const response = await easyFetch(url);
  const responseJson = await response.json();
  return responseJson;
};

export const getFeedPosts = async (token) => {
  const url = `http://localhost:3010/feed`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getPost = async (token, id) => {
  const url = `http://localhost:3010/post/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getPostComments = async (token, id) => {
  const url = `http://localhost:3010/post/comments/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getPostStatsCount = async (stats, token, id) => {
  const url = `http://localhost:3010/post/${stats}/count/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getILikeSavePost = async (token, postId, TYPE) => {
  const url = `http://localhost:3010/post/i-${TYPE}/${postId}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const likeSavePost = async (token, postId, TYPE) => {
  const url = `http://localhost:3010/post/${TYPE}/${postId}`;
  const response = await easyFetch(
    url,
    {
      authorization: token,
    },
    "POST"
  );
  const responseStatus = response.status;
  return responseStatus;
};

export const commentPost = async (token, postId, comment) => {
  const url = `http://localhost:3010/post/comment/${postId}`;
  const response = await easyFetch(
    url,
    {
      authorization: token,
    },
    "POST",
    {
      comment,
    }
  );
  const responseStatus = response.status;
  return responseStatus;
};
