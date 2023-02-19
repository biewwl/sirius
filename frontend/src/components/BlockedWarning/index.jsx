import { Icon } from "@iconify/react";
import React from "react";
import { useParams } from "react-router-dom";

function BlockedWarning() {
  const params = useParams();
  const { profile } = params;

  return (
    <div className="profile_blocked-feedback">
      <Icon icon="fluent:presence-blocked-20-regular" />
      <span>
        <strong>{profile}</strong> is blocked!
      </span>
    </div>
  );
}

export default BlockedWarning;
