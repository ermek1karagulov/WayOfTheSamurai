import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import axios from "axios";
import { setUserProfile } from "../../../redux/profileReducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";

class ProfileContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then((res) => {
        this.props.setUserProfile(res.data);
      });
  }
  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({ profile: state.profilePage.profile });

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
          <Component
              {...props}
              router={{ location, navigate, params }}
          />
      );
  }

export default connect(mapStateToProps, {setUserProfile,}) (withRouter(ProfileContainer));
