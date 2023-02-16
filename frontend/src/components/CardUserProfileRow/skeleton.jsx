import React from "react";
import "./styles/CardUserProfileRowLoading-skeleton.css";

function CardUserProfileRowSkeleton() {
  return (
    <div className="card-user-profile_skeleton">
      <div alt="" className="avatar" />
      <div className="name-and-nick">
        <div className="name">
          <span></span>
        </div>
        <span className="nick"></span>
      </div>
    </div>
  );
}

export default CardUserProfileRowSkeleton;
