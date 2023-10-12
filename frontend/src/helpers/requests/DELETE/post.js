import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const unLikePost = async (token, postId) => {
  const url = `${backendServer}/post/unlike/${postId}`;
  const response = await easyFetch(
    url,
    {
      authorization: token,
    },
    "DELETE"
  );
  const responseStatus = response.status;
  return responseStatus;
};

export const unSavePost = async (token, postId) => {
  const url = `${backendServer}/post/remove-saved/${postId}`;
  const response = await easyFetch(
    url,
    {
      authorization: token,
    },
    "DELETE"
  );
  const responseStatus = response.status;
  return responseStatus;
};
