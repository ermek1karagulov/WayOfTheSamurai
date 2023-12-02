import React, { useEffect } from "react";
import Paginator from "../common/formsControls/paginator/Paginator.tsx";
import User from "./User.tsx";
import UsersSearchForm from "./UsersSearchForm.tsx";
import { FilterType, follow, requestUsers } from "../redux/userReducer.ts";
import { useSelector } from "react-redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../redux/usersSelectors.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/reduxStore.ts";

type PropsType = {};

export const Users: React.FC<PropsType> = (props) => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const Follow = (userId: number) => {
    dispatch(follow(userId));
  };
  const unFollow = (userId: number) => {
    dispatch(unFollow(userId));
  };

  return (
    <div>
      <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />
      </div>
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
            followingInProgress={followingInProgress}
            key={u.id}
            unFollow={unFollow}
            follow={follow}
          />
        ))}
      </div>
    </div>
  );
};
