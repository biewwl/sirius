import { Icon } from "@iconify/react";
import React from "react";
import { useParams } from "react-router-dom";
import config from "../../app_config.json";
import { createBlock, deleteBlock } from "../../helpers/fetch";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/ProfileConfigMenu.css";
import { updateAccountDataAction } from "../../redux/actions/userAction";

function ProfileConfigMenu({ token, dispatch, profileMenuProps }) {
  const {
    handleOpenConfig,
    requestedBlocked,
    fetchProfileData,
    openConfigMenu,
    setOpenConfigMenu,
  } = profileMenuProps;
  const { profile: nick } = useParams();
  const actionBlock = requestedBlocked ? "unblock" : "block";
  const { Profile } = config["app.components"];
  const icons = Profile["actions.icons"];

  const handleBlock = async () => {
    if (requestedBlocked) {
      await deleteBlock(token, nick);
    } else {
      await createBlock(token, nick);
    }
    dispatch(updateAccountDataAction(token));
    fetchProfileData();
    setOpenConfigMenu(false);
  };

  const primaryClassName = "profile-config-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <>
      {openConfigMenu && (
        <div className={primaryClassName}>
          <section className={customClassName("buttons")}>
            <button
              onClick={handleBlock}
              className={customClassName("buttons__btn", null, actionBlock)}
            >
              {requestedBlocked ? (
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
});

export default connect(mapStateToProps)(ProfileConfigMenu);

ProfileConfigMenu.propTypes = {
  token: PropTypes.string,
  profileMenuProps: PropTypes.shape(),
  dispatch: PropTypes.func,
};
