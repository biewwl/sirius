import { easyFetch } from "../../fetch";

export const login = async ({ nick, password }) => {
  const response = await easyFetch("http://10.0.0.98:3010/login", {}, "POST", {
    nick,
    password,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const register = async ({ name, nick, email, password }) => {
  const response = await easyFetch(
    "http://10.0.0.98:3010/register",
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
