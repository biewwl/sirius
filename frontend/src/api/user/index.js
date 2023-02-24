import { easyFetch } from "../../helpers/fetch";

export const dataProfile = async (options) => {
  const { nick, token } = options;
  const url = `http://localhost:3010/data/profile/${nick}`;
  const response = await easyFetch(url, { authorization: token });
  if (!response.ok) return response.status;
  const responseJson = await response.json();
  return responseJson;
};

export const dataAccount = async (token) => {
  const url = "http://localhost:3010/data/account";
  const response = await easyFetch(url, { authorization: token });
  if (!response.ok) return response.status;
  const responseJson = await response.json();
  return responseJson;
};

export const tokenLogin = async (options) => {
  const { nick, password } = options;
  const response = await easyFetch(
    "http://localhost:3010/token/login",
    {},
    "POST",
    {
      nick,
      password,
    }
  );
  const responseJson = await response.json();
  return responseJson;
};

export const createRegister = async (options) => {
  const { name, nick, email, password } = options;
  const response = await easyFetch(
    "http://localhost:3010/create/register",
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
