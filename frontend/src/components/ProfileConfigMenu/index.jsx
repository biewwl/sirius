import { Icon } from "@iconify/react";
import React from "react";
import { useParams } from "react-router-dom";
import config from "../../app_config.json";
import { blockOrUnblockUser } from "../../helpers/fetch";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function ProfileConfigMenu({ token, profileMenuProps }) {
  const {
    handleOpenConfig,
    profileOwnerIsBlocked,
    fetchCompleteProfileData,
    updateLoggedData,
    openConfigMenu,
    setOpenConfigMenu,
  } = profileMenuProps;
  const { profile: nick } = useParams();
  const actionBlock = profileOwnerIsBlocked ? "unblock" : "block";
  const { Profile } = config["app.components"];
  const icons = Profile["actions.icons"];

  const handleBlock = async () => {
    await blockOrUnblockUser(token, nick, actionBlock);
    fetchCompleteProfileData();
    setOpenConfigMenu(false);
    updateLoggedData();
  };

  return (
    <>
      {openConfigMenu && (
        <div className="profile-config">
          <section>
            <button
              onClick={handleBlock}
              className={profileOwnerIsBlocked ? "unblock" : "block"}
            >
              {profileOwnerIsBlocked ? (
                <>
                  <Icon icon="material-symbols:lock-open-outline" />
                  <span>Unblock</span>
                </>
              ) : (
                <>
                  <Icon icon="material-symbols:lock-outline" />
                  <span>Block</span>
                </>
              )}
            </button>
            <button>
              <Icon icon={icons["direct"]} />
              <span>Share Profile</span>
            </button>
          </section>
          <button onClick={handleOpenConfig} className="cancel">
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(ProfileConfigMenu);

ProfileConfigMenu.propTypes = {
  token: PropTypes.string,
  profileMenuProps: PropTypes.shape()
};
