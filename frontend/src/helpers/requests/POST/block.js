import { easyFetch } from "../../fetch";

export const blockOrUnblockUser = async (token, nick, TYPE) => {
  const method = TYPE === "unblock" ? "DELETE" : "POST";
  const URL = {
    block: `http://localhost:3010/block/${nick}`,
    unblock: `http://localhost:3010/unblock/${nick}`,
  };
  await easyFetch(URL[TYPE], { authorization: token }, method);
};
