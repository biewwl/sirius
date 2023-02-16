import React from "react";
import { connect } from "react-redux";
import "./styles/ProfileSkeleton.css";
import "./styles/Profile-mobile.css";

function ProfileSkeleton() {
  return (
    <div className={`div-page-content profile-skeleton`}>
      <main className="page_profile">
        <div className="cover">
          <div className="img"></div>
        </div>
        <section className="profile_content">
          <div className="profile_avatar-and-user">
            <div className="img"></div>
            <span className="name">
              <span>{name}</span>
            </span>
            <span className="nick"></span>
          </div>
        </section>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(ProfileSkeleton);
