import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const blockOrUnblockUser = async (token, nick, TYPE) => {
  const method = TYPE === "unblock" ? "DELETE" : "POST";
  const URL = {
    block: `${backendServer}/block/${nick}`,
    unblock: `${backendServer}/unblock/${nick}`,
  };
  await easyFetch(URL[TYPE], { authorization: token }, method);
};
