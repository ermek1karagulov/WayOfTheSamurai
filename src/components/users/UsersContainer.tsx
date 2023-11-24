import React from "react";
import { connect } from "react-redux";
import {
  follow,
  setCurrentPage,
  unFollow,
  toggleFollowingProgress,
} from "../redux/userReducer.ts";
import Users from "./Users.tsx";
import Preloader from "../common/Preloader/Preloader.jsx";
import { compose } from "redux";
import { requestUsers } from "../redux/userReducer.ts";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../redux/usersSelectors.ts";
import { UserType } from "../../types/Types.ts";
import { AppStateType } from "../redux/reduxStore.ts";

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
};
type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void;
  unFollow: (userId: number) => void;
  follow: (userId: number) => void;
};
type OwnPropsType = {
  pageTitle: string;
};
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;
class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    let { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    let { pageSize } = this.props;
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.pageTitle}
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
          // toggleFollowingProgress={this.props.toggleFollowingProgress}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose<React.Component>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      follow,
      unFollow,
      getUsers: requestUsers,
    }
  )
)(UsersContainer);
