import { Icon } from "@iconify/react";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import config from "../../app_config.json";
import { followOrUnfollowUser, isFollowing } from "../../helpers/fetch";
import PropTypes from "prop-types";
import { updateAccountDataAction } from "../../redux/actions/userAction";

function ActionsProfile({ token, fetchProfileData, dispatch }) {
  const params = useParams();
  const [loggedFollowUserProfile, setLoggedFollowUserProfile] = useState(false);

  const getLoggedFollowProfileOwner = useCallback(async () => {
    const userLoggedFollowUserProfile = await isFollowing(
      token,
      profileNick,
      "user"
    );
    setLoggedFollowUserProfile(userLoggedFollowUserProfile);
  });

  const actionFollow = loggedFollowUserProfile ? "unfollow" : "follow";

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

  return (
    <>
      <Link to={`${direct}/${profileNick}`} className="profile_action-btn">
        <Icon icon={icons["direct"]} />
        <span>Direct</span>
      </Link>
      <button
        className={`profile_action-btn ${actionFollow}`}
        onClick={handleFollowUser}
      >
        <Icon icon={icons[actionFollow]} />
        <span>{actionFollow}</span>
      </button>
    </>
  );
}

// export default ActionsProfile;
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
};
