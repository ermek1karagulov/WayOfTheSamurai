import React, { useState } from "react";
import "./ProfileInfo.css";
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatusWuthHooks from "./ProfileStatusWuthHooks.tsx";
import userPhoto from "./../../../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm.jsx";
import { ProfileType } from "../../../../types/Types.ts";
import { saveProfile } from "../../../redux/profileReducer.ts";

type PropsType = {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

const ProfileInfo: React.FC<PropsType> = ({
  status,
  updateStatus,
  profile,
  ...props
}) => {
  let [editMode, setEditMode] = useState(false);
  if (!profile) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }

  return (
    <div className="item">
      <div className="descriptionBlock">
        <img
          src={profile.photos.large || userPhoto}
          alt=""
          className="mainPhoto"
        />
        <div>
          <div>
            <button>Edit</button>
          </div>
          <div>
            <b>Full Name</b>:{profile.fullName}
          </div>
          <div>
            <b>Looking for a job </b>:{profile.lookingForAJob ? "yes" : "no"}
          </div>
          {profile.lookingForAJob && (
            <div>
              <b>My professional skills </b>:{profile.lookingForAJobDeskription}
            </div>
          )}
          <div>
            <b>About me</b> :{profile.aboutMe}
          </div>
          <div>
            <b>Contacts</b> :
            {Object.keys(profile.contacts).map((key) => {
              return (
                <Contact
                  contactTitle={key}
                  contactValue={profile.contacts[key]}
                />
              );
            })}
          </div>
        </div>
        ;
        <ProfileStatusWuthHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

const ProfileData = ({ profile, goToEditMode }) => {};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className="contact">
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
