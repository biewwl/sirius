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

export const getFollowers = async (id) => {
  const response = await easyFetch(`http://localhost:3010/followers/${id}`);
  const responseJson = await response.json();
  return responseJson;
}

export const getFollowing = async (id) => {
  const response = await easyFetch(`http://localhost:3010/following/${id}`);
  const responseJson = await response.json();
  return responseJson;
}

export const getAccountData = async (token) => {
  const response = await easyFetch(`http://localhost:3010/account/data`, { authorization: token });
  const responseJson = await response.json();
  return responseJson;
}
