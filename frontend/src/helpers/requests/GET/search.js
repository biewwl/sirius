import { easyFetch } from "../../fetch";

export const searchUsers = async (query, limit, offset, token) => {
  const response = await easyFetch(
    `http://localhost:3010/search?query=${query}&limit=${limit}&offset=${offset}`,
    {
      authorization: token,
    }
  );
  const responseJson = await response.json();
  return responseJson;
};
