import React from "react";
import userPhoto from "./../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/Types";

type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  unFollow: (userId: number) => void;
  follow: (userId: number) => void;
  followed: boolean;
};

const User: React.FC<PropsType> = ({
  user,
  followingInProgress,
  unFollow,
  follow,
}) => {
  let u = user;
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + u.id}>
            <img
              src={u.photos.small != null ? u.photos.small : userPhoto}
              alt=""
              className="usersFoto"
              style={{ width: "40px", height: "40px" }}
            />
          </NavLink>
        </div>
        <div>
          {u.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === u.id)}
              onClick={() => {
                unFollow(u.id);
              }}
            >
              unFollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === u.id)}
              onClick={() => {
                follow(u.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{u.name}</div>
          <div>{u.status}</div>
        </span>
        <span>
          <div>{"u.location.country"}</div>
          <div>{"u.location.city"}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
