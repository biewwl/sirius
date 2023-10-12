import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const followOrUnfollowUser = async (token, nick, TYPE) => {
  const method = TYPE === "follow" ? "POST" : "DELETE";
  const route = TYPE === "follow" ? "follow" : "unfollow"
  await easyFetch(
    `${backendServer}/${route}/${nick}`,
    { authorization: token },
    method
  );
};
