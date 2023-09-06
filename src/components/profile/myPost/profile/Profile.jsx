import React from "react";
import "./Profile.css";
import ProfileInfo from "../../ProfileInfo/ProfileInfo";
import MyPost from "../Post/MyPost";

const Profile = (props) => {
  return (
    <div className="content">
      <ProfileInfo />
      <MyPost posts={props.state.posts} />
    </div>
  );
};

export default Profile;
