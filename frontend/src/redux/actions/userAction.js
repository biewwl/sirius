import lS from "manager-local-storage";
import { LOGIN, LOGOUT, SET_ACCOUNT_DATA } from "../reducer/userReducer";
import config from "../../app_config.json";
import {
  countFollowers,
  countFollowing,
  countPosts,
  dataAccount,
} from "../../helpers/fetch";

const appName = config["app.name"];

export const setAccountDataAction = (userData) => ({
  type: SET_ACCOUNT_DATA,
  payload: userData,
});

export const updateAccountDataAction = (token) => {
  return async (dispatch) => {
    const userData = await dataAccount(token);
    const { nick } = userData;
    const followingCount = await countFollowing({ token, nick });
    const followersCount = await countFollowers({ token, nick });
    const postsCount = await countPosts(token, nick);
    return dispatch(
      setAccountDataAction({
        ...userData,
        followingCount,
        followersCount,
        postsCount,
      })
    );
  };
};
export const loginAction = (token) => {
  lS.set(`${appName}-login-token`, token);
  return async (dispatch) => {
    dispatch({ type: LOGIN, payload: token });
    const userData = await dataAccount(token);
    const { nick } = userData;
    const followingCount = await countFollowing({ token, nick });
    const followersCount = await countFollowers({ token, nick });
    const postsCount = await countPosts(token, nick);
    return dispatch(
      setAccountDataAction({
        ...userData,
        followingCount,
        followersCount,
        postsCount,
      })
    );
  };
};

export const logoutAction = () => {
  lS.remove(`${appName}-login-token`);
  return { type: LOGOUT };
};
