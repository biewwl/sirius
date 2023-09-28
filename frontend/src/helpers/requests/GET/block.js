import { easyFetch } from "../../fetch";

export const getIBlockUser = async (token, nick) => {
  const response = await easyFetch(`http://10.0.0.98:3010/i-block/${nick}`, {
    authorization: token,
  });
  if (response.status !== 200) return false;
  const responseJson = await response.json();
  return responseJson;
};