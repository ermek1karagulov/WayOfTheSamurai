import React from "react";
import Paginator from "../common/formsControls/paginator/Paginator.tsx";
import User from "./User.jsx";
import { UserType } from "../../types/Types.ts";

type PropsType = {
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  totalUsersCount: number;
  pageSize: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  unFollow: (userId: number) => void;
  follow: (userId: number) => void;
};

const Users: React.FC<PropsType> = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  users,
  ...props
}) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>
        {users.map((u) => (
          <User
            user={u}
            key={u.id}
            followingInProgress={props.followingInProgress}
            unFollow={props.unFollow}
            follow={props.follow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
