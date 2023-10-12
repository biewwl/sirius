import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const createPrivateChatByNick = async (token, nick) => {
  const URL = `${backendServer}/chat/create`;
  const response = await easyFetch(
    URL,
    {
      authorization: token,
    },
    "POST",
    { type: "private", anotherMember: nick }
  );
  const responseJson = await response.json();
  return responseJson.id;
};

export const createMessage = async (
  token,
  { respondingMessage, message, chatId }
) => {
  const URL = `${backendServer}/chat/create/message`;
  const response = await easyFetch(
    URL,
    {
      authorization: token,
    },
    "POST",
    { message, chatId, respondingMessage }
  );
  const responseJson = await response.json();
  return responseJson.id;
};
