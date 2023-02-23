import React from "react";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/CardUserProfileRow-skeleton.css";

function CardUserProfileRowSkeleton() {
  const primaryClassName = "card-user-profile-row--skeleton";
  const customClassName = generateClassName(primaryClassName);

  return (
    <div className={primaryClassName}>
      <div alt="" className={customClassName("avatar")} />
      <div className={customClassName("name-and-nick")}>
        <div className={customClassName("name-and-nick__name")}></div>
        <div className={customClassName("name-and-nick__nick")}></div>
      </div>
    </div>
  );
}

export default CardUserProfileRowSkeleton;
