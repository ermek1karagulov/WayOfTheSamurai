import React from "react";
import Header from "./Header";
import axios from "axios";

class HeaderContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`)
      .then((res) => {});
  }
  render() {
    return <Header {...this.props} />;
  }
}

export default HeaderContainer;
