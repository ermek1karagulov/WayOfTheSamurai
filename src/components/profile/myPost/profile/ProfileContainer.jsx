import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import axios from "axios";
import { setUserProfile } from "../../../redux/profileReducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../../../redux/profileReducer";
import withAuthRedirect from "../../../../huc/withAuthRedirect";
class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 10;
    }
    this.props.getUserProfile(userId);
  }
  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let authRedirectComponent = withAuthRedirect(ProfileContainer);
let mapStateToPropsForRedirect = (state) => ({
  isAuth: state.auth.isAuth,
});
authRedirectComponent = connect(mapStateToPropsForRedirect)(
  authRedirectComponent
);

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
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
  withRouter(authRedirectComponent)
);
