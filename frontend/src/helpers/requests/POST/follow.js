import { easyFetch } from "../../fetch";

export const followOrUnfollowUser = async (token, nick, TYPE) => {
  const method = TYPE === "unfollow" ? "DELETE" : "POST";
  await easyFetch(
    `http://localhost:3010/${TYPE}/${nick}`,
    { authorization: token },
    method
  );
};
