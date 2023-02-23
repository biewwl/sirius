import { Icon } from "@iconify/react";
import React from "react";
import { useParams } from "react-router-dom";
import "./styles/BlockedWarning.css";

function BlockedWarning() {
  const params = useParams();
  const { profile } = params;

  return (
    <div className="blocked-warning-component">
      <Icon icon="fluent:presence-blocked-20-regular" />
      <span>
        <strong>{profile}</strong> is blocked!
      </span>
    </div>
  );
}

export default BlockedWarning;
