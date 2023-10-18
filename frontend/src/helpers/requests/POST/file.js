// import { easyFetch } from "../../fetch";

import config from "../../../app_config.json";
const backendServer = config["app.backend"];

export const postFile = async (token, formData) => {
  const response = await fetch(`${backendServer}/files`, {
    method: "POST",
    body: formData,
    headers: { authorization: token },
  });
  const responseJson = await response.json();
  return responseJson;
};
