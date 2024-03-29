import { Icon } from "@iconify/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import config from "../../app_config.json";
import { blockOrUnblockUser } from "../../helpers/fetch";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/ProfileConfigMenu.css";

function ProfileConfigMenu({ token, profileMenuProps, accountDataREDUX }) {
  const {
    handleOpenConfig,
    profileOwnerIsBlocked,
    fetchProfileData,
    openConfigMenu,
    setOpenConfigMenu,
  } = profileMenuProps;
  const { profile: nick } = useParams();
  const actionBlock = profileOwnerIsBlocked ? "unblock" : "block";
  const { Profile } = config["app.components"];
  const icons = Profile["actions.icons"];

  const { nick: nickLogged } = accountDataREDUX;

  const loggedOwner = nick === nickLogged;

  const handleBlock = async () => {
    await blockOrUnblockUser(token, nick, actionBlock);
    fetchProfileData();
    setOpenConfigMenu(false);
  };

  const primaryClassName = "profile-config-component";
  const customClassName = generateClassName(primaryClassName);

  const blockAction = profileOwnerIsBlocked ? "unblock" : "block";

  return (
    <>
      {openConfigMenu && (
        <div className={primaryClassName}>
          <section className={customClassName("buttons")}>
            {loggedOwner && (
              <Link to={"/edit"} className={customClassName("buttons__btn")}>
                <Icon icon="solar:pen-linear" />
                <span>Edit Profile</span>
              </Link>
            )}
            {!loggedOwner && (
              <button
                onClick={handleBlock}
                className={customClassName("buttons__btn", null, blockAction)}
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
            )}
            <button className={customClassName("buttons__btn")}>
              <Icon icon={icons["direct"]} />
              <span>Share Profile</span>
            </button>
          </section>
          <button
            onClick={handleOpenConfig}
            className={customClassName("cancel-btn")}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  accountDataREDUX: state.userReducer.accountData,
});

export default connect(mapStateToProps)(ProfileConfigMenu);

ProfileConfigMenu.propTypes = {
  token: PropTypes.string,
  profileMenuProps: PropTypes.shape(),
  accountDataREDUX: PropTypes.shape(),
};
