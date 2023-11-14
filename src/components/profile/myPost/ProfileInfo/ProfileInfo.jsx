import React from "react";
import "./ProfileInfo.css";
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

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
        <ProfileStatus status={"Hello my friends"} />
      </div>
    </div>
  );
};

export default ProfileInfo;
