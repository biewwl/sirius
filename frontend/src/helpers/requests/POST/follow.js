import { easyFetch } from "../../fetch";

export const followOrUnfollowUser = async (token, nick, TYPE) => {
  const method = TYPE === "follow" ? "POST" : "DELETE";
  const route = TYPE === "follow" ? "follow" : "unfollow"
  await easyFetch(
    `http://localhost:3010/${route}/${nick}`,
    { authorization: token },
    method
  );
};
