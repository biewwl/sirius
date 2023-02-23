import { unLikePost, unSavePost } from "./requests/DELETE/post";
import { getIBlockUser } from "./requests/GET/block";
import {
  getFollows,
  getFollowsCount,
  isFollowing,
} from "./requests/GET/follow";
import {
  fetchPosts,
  getFeedPosts,
  getILikeSavePost,
  getPost,
  getPostComments,
  getPostsCount,
  getPostStatsCount,
  getSavedPosts,
} from "./requests/GET/post";
import { searchUsers } from "./requests/GET/search";
import { getLoggedData, getProfileData } from "./requests/GET/userData";
import { blockOrUnblockUser } from "./requests/POST/block";
import { followOrUnfollowUser } from "./requests/POST/follow";
import { login, register } from "./requests/POST/loginAndRegister";
import { commentPost, likePost, savePost } from "./requests/POST/post";

export const easyFetch = async (url, headers, method, body) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      ...headers,
    },
    body: JSON.stringify(body),
  };
  if (!method) {
    delete options.method;
  }
  if (!body) {
    delete options.body;
  }
  const response = await fetch(url, options);
  return response;
};

export {
  login,
  register,
  getFollows,
  getFollowsCount,
  isFollowing,
  followOrUnfollowUser,
  blockOrUnblockUser,
  getIBlockUser,
  getLoggedData,
  getProfileData,
  searchUsers,
  fetchPosts,
  getPostsCount,
  getFeedPosts,
  getPost,
  getPostComments,
  getPostStatsCount,
  getILikeSavePost,
  commentPost,
  getSavedPosts,
  savePost,
  unSavePost,
  likePost,
  unLikePost,
};
