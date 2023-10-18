import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileData } from "../../helpers/fetch";
import { Icon } from "@iconify/react";
import { verifiedType } from "../../helpers";
import HeaderAndAside from "../../components/HeaderAndAside";
import ProfileSkeleton from "../../pages/Profile/skeleton";
import ProfileConfigMenu from "../../components/ProfileConfigMenu";
import generateClassName from "../../helpers/generateClassBEM";
import AsideStories from "../../components/AsideStories";
import "./styles/Profile.css";
import "../../pages/Profile/styles/Profile-mobile.css";
import { Link, useNavigate } from "react-router-dom";
// import { postFile } from "../../helpers/requests/POST/file";
import { updateUserData } from "../../helpers/requests/PUT/user";
import { updateAccountDataAction } from "../../redux/actions/userAction";

function Profile({ token, accountDataREDUX, dispatch }) {
  // Component State
  const [profileData, setProfileData] = useState({});
  const [openConfigMenu, setOpenConfigMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  // Variables
  const {
    name,
    coverUrl,
    avatarUrl,
    accountVerified,
    avatarUrlFile,
    coverUrlFile,
  } = profileData;
  const isVerified = accountVerified !== "none";
  const { text, icon } = verifiedType(accountVerified);

  const { nick } = accountDataREDUX ?? {};

  const navigate = useNavigate()

  // Fetch data
  const fetchProfileData = useCallback(async () => {
    if (nick) {
      const data = await getProfileData(token, nick);
      setProfileData(data);
    }
  });

  const save = async () => {
    const formData = new FormData();
    formData.append("files", avatarUrlFile);
    formData.append("files", coverUrlFile);

    const imagesInfo = {};
    if (avatarUrlFile) imagesInfo.avatar = avatarUrlFile.name;
    if (coverUrlFile) imagesInfo.cover = coverUrlFile.name;

    formData.append("profileImagesInfo", JSON.stringify(imagesInfo));

    await updateUserData(token, formData);
    dispatch(updateAccountDataAction(token));

    navigate(`/p/${nick}`)
  };

  // Handles
  const handleOpenConfig = () => {
    setOpenConfigMenu(!openConfigMenu);
  };

  const handleChangeProfileData = ({ target }) => {
    const { name, files } = target;

    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          [name]: e.target.result,
          [`${name}File`]: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // ConfigMenu Props
  const profileMenuProps = {
    handleOpenConfig,
    fetchProfileData,
    openConfigMenu,
    setOpenConfigMenu,
  };

  // Setup
  const setup = async () => {
    setLoading(true);
    await fetchProfileData();
    setLoading(false);
  };

  // const handleConfirmChanges = async () => {
  //   await
  // }

  // UseEffects
  useEffect(() => {
    setup();
  }, [nick]);

  const isSkeleton = loading;

  const primaryClassName = "profile-page";
  const customClassName = generateClassName(primaryClassName);

  return (
    <div className="div-page">
      <HeaderAndAside />
      {isSkeleton || !nick ? (
        <ProfileSkeleton profileMenuProps={profileMenuProps} />
      ) : (
        <>
          <main className={`${primaryClassName}`}>
            <label
              htmlFor="image-input-cover"
              className={customClassName("cover")}
            >
              <img
                src={coverUrl}
                alt=""
                className={customClassName("cover__image")}
              />
            </label>
            <input
              type="file"
              name="coverUrl"
              id="image-input-cover"
              className={customClassName("image-input")}
              accept="image/*"
              onChange={handleChangeProfileData}
            />
            <section className={customClassName("content")}>
              <div className={customClassName("content__avatar-and-user")}>
                <label htmlFor="image-input-avatar">
                  <img
                    src={avatarUrl}
                    alt=""
                    className={customClassName("content__avatar-and-user__img")}
                  />
                </label>
                <input
                  type="file"
                  name="avatarUrl"
                  id="image-input-avatar"
                  className={customClassName("image-input")}
                  accept="image/*"
                  onChange={handleChangeProfileData}
                />
                <span
                  className={customClassName(
                    "content__avatar-and-user__name-area"
                  )}
                >
                  <span
                    className={customClassName(
                      "content__avatar-and-user__name-area__name"
                    )}
                  >
                    {name}
                  </span>
                  {isVerified && (
                    <div
                      title={text}
                      className={customClassName(
                        "content__avatar-and-user__name-area__icon-verified"
                      )}
                    >
                      <Icon
                        icon={icon}
                        className={`verified-${accountVerified}`}
                        title="test"
                      />
                    </div>
                  )}
                </span>
                <span
                  className={customClassName("content__avatar-and-user__nick")}
                >
                  @{nick}
                </span>
              </div>
              <section className={customClassName("content__buttons")}>
                <button
                  className={customClassName(
                    "content__buttons__btn",
                    " --save"
                  )}
                  onClick={save}
                >
                  <Icon
                    icon="teenyicons:tick-circle-outline"
                    className={customClassName("content__buttons__btn__icon")}
                  />
                  Save
                </button>
                <Link
                  className={customClassName(
                    "content__buttons__btn",
                    " --discard"
                  )}
                  to={`/p/${nick}`}
                >
                  <Icon
                    icon="teenyicons:x-circle-outline"
                    className={customClassName("content__buttons__btn__icon")}
                  />
                  Discard
                </Link>
              </section>
            </section>
            {openConfigMenu && (
              <ProfileConfigMenu profileMenuProps={profileMenuProps} />
            )}
          </main>
        </>
      )}
      <AsideStories />
    </div>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Profile);

Profile.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
