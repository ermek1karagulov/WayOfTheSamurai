import React from "react";
import Preloader from "../common/Preloader/Preloader.jsx";
import { getIsFetching } from "../redux/usersSelectors.ts";
import { useSelector } from "react-redux";
import { Users } from "./Users.tsx";

type UsersPagePropsType = {
  pageTitle: string;
};

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      {props.pageTitle}
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
