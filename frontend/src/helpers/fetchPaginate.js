import { easyFetch } from "./fetch";

const fetchPaginate = async ({ url, token, limit, offset, op }) => {
  const formattedUrl = `http://localhost:3010/${url}${op}limit=${limit}&offset=${offset}`;
  const response = await easyFetch(formattedUrl, { authorization: token });
  const responseJson = await response.json();
  return responseJson;
};

export default fetchPaginate;
