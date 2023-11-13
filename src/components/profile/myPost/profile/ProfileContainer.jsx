import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import axios from "axios";
import { setUserProfile } from "../../../redux/profileReducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../../../redux/profileReducer";
class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 10;
    }
    this.props.getUserProfile(userId);
  }
  render() {
    if (!props.isAuth) {
      return <Navigate to="/login" />;
    }

    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}
export default connect(mapStateToProps, { getUserProfile })(
  withRouter(ProfileContainer)
);
