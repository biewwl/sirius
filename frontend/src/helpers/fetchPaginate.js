import { easyFetch } from "./fetch";

import config from "../app_config.json";

const backendServer = config["app.backend"];

const fetchPaginate = async ({ url, token, limit, offset, op }) => {
  const formattedUrl = `${backendServer}/${url}${op}limit=${limit}&offset=${offset}`;
  const response = await easyFetch(formattedUrl, { authorization: token });
  const responseJson = await response.json();
  return responseJson;
};

export default fetchPaginate;
