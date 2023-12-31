import React from "react";
import Profile from "./Profile.tsx";
import { connect } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getUserProfile,
  getStatus,
  updateStatus,
} from "../../../redux/profileReducer.ts";
import { compose } from "redux";
import { AppStateType } from "../../../redux/reduxStore.ts";
class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        <Link to={"/login"} />;
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate() {
    if (this.props.router.params.userId != this.props.router.params.userId) {
      return this.refreshProfile();
    }
  }
  render() {
    return (
      <div>
        <Profile
          {...this.props}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
        />
      </div>
    );
  }
}
let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  withRouter
)(ProfileContainer);
