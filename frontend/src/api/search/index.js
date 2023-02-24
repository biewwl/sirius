import { easyFetch } from "../../helpers/fetch";

export const listSearch = async (options) => {
  const { query, limit, offset, token } = options;
  const params = `&limit=${limit}&offset=${offset}`;
  const url = `http://localhost:3010/list/search?query=${query}${params}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};
