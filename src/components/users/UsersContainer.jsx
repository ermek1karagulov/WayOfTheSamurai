import React from "react";
import { connect } from "react-redux";
import {
  follow,
  setCurrentPage,
  unFollow,
  toggleFollowingProgress,
} from "../redux/userReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { requestUsers } from "../redux/userReducer";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../redux/usersSelectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
          toggleFollowingProgress={this.props.toggleFollowingProgress}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    // users: getUsers(state),
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unFollow,
    setCurrentPage,
    toggleFollowingProgress,
    requestUsers,
  })
)(UsersContainer);
