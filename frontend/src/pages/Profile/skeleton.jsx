import React from "react";
import { connect } from "react-redux";
import ProfileConfigMenu from "../../components/ProfileConfigMenu";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import config from "../../app_config.json";
import BlockedWarning from "../../components/BlockedWarning";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/ProfileSkeleton.css";
import "./styles/Profile-mobile.css";

function ProfileSkeleton({ profileMenuProps }) {
  const { Profile } = config["app.components"];
  const icons = Profile["actions.icons"];

  const {
    openConfigMenu,
    handleOpenConfig,
    requestedBlocked,
    requesterBlocked,
  } = profileMenuProps;

  const actionBlock = requestedBlocked ? "unblock" : "block";

  const primaryClassName = "profile-page--skeleton";
  const customClassName = generateClassName(primaryClassName);

  return (
    <>
      <main className={`${primaryClassName} ${actionBlock}`}>
        {requestedBlocked && <BlockedWarning />}
        <div className={customClassName("cover")}>
          <div className={customClassName("cover__image")}></div>
        </div>
        <section className={customClassName("content")}>
          <div className={customClassName("content__avatar-and-user")}>
            <div
              className={customClassName("content__avatar-and-user__avatar")}
            ></div>
            <span
              className={customClassName("content__avatar-and-user__name-area")}
            >
              <span
                className={customClassName(
                  "content__avatar-and-user__name-area__name"
                )}
              ></span>
            </span>
            <span
              className={customClassName("content__avatar-and-user__nick")}
            ></span>
          </div>
          <div className={customClassName("content__actions")}>
            {requesterBlocked && (
              <button
                className={customClassName("content__actions__config-btn")}
                onClick={handleOpenConfig}
              >
                <Icon icon={icons["config"]} />
              </button>
            )}
          </div>
        </section>
        {openConfigMenu && (
          <ProfileConfigMenu profileMenuProps={profileMenuProps} />
        )}
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(ProfileSkeleton);

ProfileSkeleton.propTypes = {
  token: PropTypes.string,
  profileMenuProps: PropTypes.shape(),
  isBlocked: PropTypes.bool,
};
