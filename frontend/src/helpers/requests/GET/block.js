import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const getIBlockUser = async (token, nick) => {
  const response = await easyFetch(`${backendServer}/i-block/${nick}`, {
    authorization: token,
  });
  if (response.status !== 200) return false;
  const responseJson = await response.json();
  return responseJson;
};