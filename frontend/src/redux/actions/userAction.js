import lS from "manager-local-storage";
import { LOGIN } from "../reducer/userReducer";
import config from "../../app_config.json";

const appName = config["app.name"];

export const loginAction = (token) => {
  lS.set(`${appName}-login-token`, token);
  return { type: LOGIN, payload: token };
};
