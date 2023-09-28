import { easyFetch } from "../../fetch";

export const loggedChats = async (token) => {
  const URL = "http://10.0.0.98:3010/chats";
  const response = await easyFetch(URL, {
    authorization: token,
  });
  const responseJson = await response.json();
  const filteredChats = responseJson.filter((chat) => chat.messages.length > 0);
  return filteredChats;
};

export const chatMessages = async (token, chatId) => {
  const URL = `http://10.0.0.98:3010/chat/${chatId}`;
  const response = await easyFetch(URL, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};
