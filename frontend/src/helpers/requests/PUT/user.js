// import { easyFetch } from "../../fetch";
import config from "../../../app_config.json";

const backendServer = config["app.backend"];

export const updateUserData = async (token, userData, headers = {}) => {
  await fetch(`${backendServer}/user/data`, {
    headers: { authorization: token, ...headers },
    method: "PUT",
    body: userData,
  });
};

export const updateAvatar = async (token, imageUrl) => {
  await updateUserData(token, JSON.stringify({ avatarUrl: imageUrl }), {
    "Content-Type": "application/json",
  });
};

export const updateCover = async (token, imageUrl) => {
  await updateUserData(token, JSON.stringify({ coverUrl: imageUrl }), {
    "Content-Type": "application/json",
  });
};
