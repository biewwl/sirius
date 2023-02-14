import lS from "manager-local-storage";
import config from "../../app_config.json";

const appName = config["app.name"];
const savedToken = lS.get(`${appName}-login-token`);

const initialState = {
  token: savedToken ?? "",
  accountData: {},
};

export const LOGIN = "LOGIN";
export const SET_ACCOUNT_DATA = "SET_ACCOUNT_DATA";
export const LOGOUT = "LOGOUT";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_ACCOUNT_DATA:
      return {
        ...state,
        accountData: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: "",
      };
    default:
      return state;
  }
};

export default userReducer;
