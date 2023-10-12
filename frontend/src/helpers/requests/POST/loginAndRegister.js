import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const login = async ({ nick, password }) => {
  const response = await easyFetch(`${backendServer}/login`, {}, "POST", {
    nick,
    password,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const register = async ({ name, nick, email, password }) => {
  const response = await easyFetch(
    `${backendServer}/register`,
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
