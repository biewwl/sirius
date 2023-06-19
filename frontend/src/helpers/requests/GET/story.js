import { easyFetch } from "../../fetch";

export const getFeedStories = async (token) => {
  const url = `http://localhost:3010/stories/feed`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};
