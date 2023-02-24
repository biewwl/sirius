import { easyFetch } from "../../helpers/fetch";

export const countPostViews = async (token, id) => {
  const url = `http://localhost:3010/count/post-views/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};