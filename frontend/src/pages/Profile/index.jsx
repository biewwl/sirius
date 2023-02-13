import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import PropTypes from "prop-types";
import SectionTitle from "../../components/SectionTitle";
import "./styles/Profile.css";
import { getProfileData } from "../../helpers/fetch";
import { useParams } from "react-router-dom";

function Profile({ token }) {
  const [profileData, setProfileData] = useState({});

  const { name, nick, coverUrl, avatarUrl, followersCount, followingCount } =
    profileData;

  const { profile: profileNick } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getProfileData(token, profileNick);
      setProfileData(data);
    };
    fetchProfileData();
  }, [profileNick]);

  return (
    <div className="div-page">
      <Header />
      <div className="div-page-content profile">
        <main className="page_profile">
          <div className="cover">
            <img src={coverUrl} alt="" />
          </div>
          <section className="profile_content">
            <div className="profile_avatar-and-user">
              <img src={avatarUrl} alt="" />
              <span className="name">{name}</span>
              <span className="nick">@{nick}</span>
            </div>
            <div className="stats_profile">
              <div className="stats follows">
                <span className="title">Followers</span>
                <span className="count">{followersCount}</span>
              </div>
              <div className="stats following">
                <span className="title">Following</span>
                <span className="count">{followingCount}</span>
              </div>
              <div className="stats posts">
                <span className="title">Posts</span>
                <span className="count">0</span>
              </div>
            </div>
            <div className="profile_posts">
              <SectionTitle title="Posts" icon="gridicons:posts" />
            </div>
          </section>
        </main>
      </div>
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
