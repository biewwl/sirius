import { easyFetch } from "../../fetch";

export const getIBlockUser = async (token, nick) => {
  const response = await easyFetch(`http://localhost:3010/i-block/${nick}`, {
    authorization: token,
  });
  if (response.status !== 200) return false;
  const responseJson = await response.json();
  return responseJson;
};