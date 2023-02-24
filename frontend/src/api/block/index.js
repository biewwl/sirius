import { easyFetch } from "../../helpers/fetch";

// Get
export const checkBlock = async (token, nick) => {
  const response = await easyFetch(
    `http://localhost:3010/check/block/${nick}`,
    {
      authorization: token,
    }
  );
  if (response.status !== 200) return false;
  const responseJson = await response.json();
  return responseJson;
};

// Post
export const createBlock = async (token, nick) => {
  await easyFetch(
    `http://localhost:3010/create/block/${nick}`,
    { authorization: token },
    "POST"
  );
};

// Delete
export const deleteBlock = async (token, nick) => {
  await easyFetch(
    `http://localhost:3010/delete/block/${nick}`,
    { authorization: token },
    "DELETE"
  );
};
