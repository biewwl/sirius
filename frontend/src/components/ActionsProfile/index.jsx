import { Icon } from "@iconify/react";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../app_config.json";
import { followOrUnfollowUser, isFollowing } from "../../helpers/fetch";
import PropTypes from "prop-types";
import { updateAccountDataAction } from "../../redux/actions/userAction";
import generateClassName from "../../helpers/generateClassBEM";
import { createPrivateChatByNick } from "../../helpers/requests/POST/chats";
import "./styles/ActionsProfile.css";

function ActionsProfile({
  token,
  fetchProfileData,
  dispatch,
  primaryClassName,
}) {
  const params = useParams();
  const navigate = useNavigate();

  const [loggedFollowUserProfile, setLoggedFollowUserProfile] = useState("Follow");

  const getLoggedFollowProfileOwner = useCallback(async () => {
    const userLoggedFollowUserProfile = await isFollowing(
      token,
      profileNick,
      "user"
    );
    setLoggedFollowUserProfile(userLoggedFollowUserProfile);
  });

  const defineActionFollowText = () => {
    switch (loggedFollowUserProfile) {
      case "not following":
        return "follow"

      case "following":
          return "unfollow"

      case "pending":
        return "pending"
    
      default:
        break;
    }
  }

  const actionFollow = defineActionFollowText();

  const { profile: profileNick } = useParams();
  const { direct } = config["app.routes"];
  const { Profile } = config["app.components"];
  const icons = Profile["actions.icons"];

  const handleFollowUser = async () => {
    await followOrUnfollowUser(token, profileNick, actionFollow);
    fetchProfileData();
    getLoggedFollowProfileOwner();
    dispatch(updateAccountDataAction(token));
  };

  useEffect(() => {
    getLoggedFollowProfileOwner();
  }, [params]);

  const customClassName = generateClassName(primaryClassName);
  const [customLinkDirect] = direct.split("/:");

  const redirectToChat = async () => {
    const chatId = await createPrivateChatByNick(token, profileNick);
    navigate(`${customLinkDirect}/${chatId}`);
  }

  return (
    <>
      <p
        onClick={redirectToChat}
        className={customClassName("action-area direct-btn")}
      >
        <Icon
          icon={icons["direct"]}
          className={customClassName("action-area__icon")}
        />
        <span className={customClassName("action-area__text")}>Direct</span>
      </p>
      <button
        className={customClassName("action-area", null, actionFollow)}
        onClick={handleFollowUser}
      >
        <Icon
          icon={icons[actionFollow]}
          className={customClassName("action-area__icon")}
        />
        <span className={customClassName("action-area__text")}>
          {actionFollow}
        </span>
      </button>
    </>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(ActionsProfile);

ActionsProfile.propTypes = {
  token: PropTypes.string,
  updateLoggedData: PropTypes.func,
  fetchProfileData: PropTypes.func,
  dispatch: PropTypes.func,
  primaryClassName: PropTypes.string,
};
