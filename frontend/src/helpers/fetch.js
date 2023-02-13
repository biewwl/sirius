const easyFetch = async (url, headers, method, body) => {
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

export const getFollowersCount = async (nick) => {
  const response = await easyFetch(
    `http://localhost:3010/followers/count/${nick}`
  );
  const responseJson = await response.json();
  return responseJson;
};

export const getFollowingCount = async (nick) => {
  const response = await easyFetch(
    `http://localhost:3010/following/count/${nick}`
  );
  const responseJson = await response.json();
  return responseJson;
};

const getData = async (url, token) => {
  const response = await easyFetch(url, {
    authorization: token,
    "Cache-Control": "no-cache",
  });
  const responseJson = await response.json();
  const { nick } = responseJson;
  const followersCount = await getFollowersCount(nick);
  const followingCount = await getFollowingCount(nick);
  const postsCount = 0;
  return { ...responseJson, followersCount, followingCount, postsCount };
};

export const getLoggedData = async (token) =>
  getData("http://localhost:3010/account/data", token);

export const getProfileData = async (token, nick) =>
  getData(`http://localhost:3010/profile/${nick}`, token);
