import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const likePost = async (token, postId) => {
  const url = `${backendServer}/post/like/${postId}`;
  const response = await easyFetch(
    url,
    {
      authorization: token,
    },
    "POST"
  );
  const responseStatus = response.status;
  return responseStatus;
};

export const savePost = async (token, postId) => {
  const url = `${backendServer}/post/save/${postId}`;
  const response = await easyFetch(
    url,
    {
      authorization: token,
    },
    "POST"
  );
  const responseStatus = response.status;
  return responseStatus;
};

export const commentPost = async (token, postId, comment) => {
  const url = `${backendServer}/post/comment/${postId}`;
  const response = await easyFetch(
    url,
    {
      authorization: token,
    },
    "POST",
    {
      comment,
    }
  );
  const responseStatus = response.status;
  return responseStatus;
};

export const createPost = async (token, formData) => {
  const response = await fetch(`${backendServer}/post`, {
    method: "POST",
    body: formData,
    headers: { authorization: token },
  });
  const post = await response.json();
  const { id } = post;
  return id;
};

export const createRepost = async (token, formData) => {
  const response = await fetch(`${backendServer}/repost`, {
    method: "POST",
    body: formData,
    headers: { authorization: token },
  });
  const post = await response.json();
  const { id } = post;
  return id;
};
