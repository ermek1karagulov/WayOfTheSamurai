import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
// import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer.tsx";
import ProfileContainer, {
  withRouter,
} from "./components/profile/myPost/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/login/Login";
import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { initializApp } from "./components/redux/appReducer.ts";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
const DialogsContainer = React.lazy(() =>
  import("./components/dialogs/DialogsContainer")
);

// deploy

class App extends Component {
  componentDidMount() {
    this.props.initializApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <Suspense
        fallback={
          <div>
            <Preloader />
          </div>
        }
      >
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-comntent">
            <Routes>
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/profile" element={<ProfileContainer />} />
              <Route
                path="/users"
                element={<UsersContainer pageTitle="Самурай" />}
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { initializApp })
)(App);

// Welcome to it-kamasutra
// ufgffff
