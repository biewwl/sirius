import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const searchUsers = async (query, limit, offset, token) => {
  const response = await easyFetch(
    `${backendServer}/search?query=${query}&limit=${limit}&offset=${offset}`,
    {
      authorization: token,
    }
  );
  const responseJson = await response.json();
  return responseJson;
};
