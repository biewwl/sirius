import { easyFetch } from "../../fetch";

export const createPrivateChatByNick = async (token, nick) => {
  const URL = `http://10.0.0.98:3010/chat/create`;
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
  const URL = `http://10.0.0.98:3010/chat/create/message`;
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
