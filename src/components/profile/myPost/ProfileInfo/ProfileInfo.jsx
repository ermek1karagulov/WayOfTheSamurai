import React from "react";
import "./ProfileInfo.css";
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatusWuthHooks from "./ProfileStatusWuthHooks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }
  return (
    <div className="item">
      <div className="descriptionBlock">
        <img src={props.profile.photos.large} alt="" />
        <ProfileStatusWuthHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
