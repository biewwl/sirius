import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const loggedChats = async (token) => {
  const URL = `${backendServer}/chats`;
  const response = await easyFetch(URL, {
    authorization: token,
  });
  const responseJson = await response.json();
  const filteredChats = responseJson.filter((chat) => chat.messages.length > 0);
  return filteredChats;
};

export const chatMessages = async (token, chatId) => {
  const URL = `${backendServer}/chat/${chatId}`;
  const response = await easyFetch(URL, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};
