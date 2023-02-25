import { Icon } from "@iconify/react";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import config from "../../app_config.json";
import { checkIFollow, createFollow, deleteFollow } from "../../helpers/fetch";
import PropTypes from "prop-types";
import { updateAccountDataAction } from "../../redux/actions/userAction";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/ActionsProfile.css";

function ActionsProfile({
  token,
  fetchProfileData,
  dispatch,
  primaryClassName,
}) {
  const params = useParams();
  const [requesterFollow, setRequesterFollow] = useState(false);

  const getRequesterFollow = useCallback(async () => {
    const follow = await checkIFollow({ token, nick });

    setRequesterFollow(follow);
  });

  const pendingFollow =
    requesterFollow === "pending" ? "requested" : "unfollow";
  const actionFollow = requesterFollow ? pendingFollow : "follow";

  const { profile: nick } = useParams();
  const { direct } = config["app.routes"];
  const { Profile } = config["app.components"];
  const icons = Profile["actions.icons"];

  const handleFollowUser = async () => {
    if (requesterFollow) {
      await deleteFollow({ token, nick });
    } else {
      await createFollow({ token, nick });
    }
    fetchProfileData();
    getRequesterFollow();
    dispatch(updateAccountDataAction(token));
  };

  useEffect(() => {
    getRequesterFollow();
  }, [params]);

  const customClassName = generateClassName(primaryClassName);

  return (
    <>
      <Link to={`${direct}/${nick}`} className={customClassName("action-area")}>
        <Icon
          icon={icons["direct"]}
          className={customClassName("action-area__icon")}
        />
        <span className={customClassName("action-area__text")}>Direct</span>
      </Link>
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
