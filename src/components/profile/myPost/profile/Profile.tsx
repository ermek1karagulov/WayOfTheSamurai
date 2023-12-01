import React from "react";
import "./Profile.css";
import MyPostContainer from "../Post/MyPostContainer.tsx";
import ProfileInfo from "./../ProfileInfo/ProfileInfo.tsx";
import { ProfileType } from "../../../../types/Types.ts";
import { type } from "os";

type PropsType = {
  profile: any;
  status: string;
  updateStatus: any;
};

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div className="content">
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MyPostContainer />
    </div>
  );
};

export default Profile;
