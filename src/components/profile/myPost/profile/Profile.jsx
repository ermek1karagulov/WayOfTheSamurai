import React from "react";
import "./Profile.css";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import MyPost from "../Post/MyPost";
import MyPostContainer from "../Post/MyPostContainer";

const Profile = (props) => {
  return (
    <div className="content">
      <ProfileInfo profile={props.profile} />
      <MyPostContainer />
    </div>
  );
};

export default Profile;
