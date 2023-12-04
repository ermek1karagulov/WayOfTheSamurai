import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar.jsx";
// import "antd/dist/antd.css";
// import DialogsContainer from "./components/dialogs/DialogsContainer";
import ProfileContainer, {
  withRouter,
} from "./components/profile/myPost/profile/ProfileContainer.jsx";
import HeaderContainer from "./components/header/HeaderContainer.jsx";
import Login from "./components/login/Login.tsx";
import React, { Component, Suspense } from "react";
import { Provider, connect } from "react-redux";
import { initializApp } from "./components/redux/appReducer.ts";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader.jsx";
import store, { AppStateType } from "./components/redux/reduxStore.ts";
import { ComponentType } from "react";
import { UsersPage } from "./components/users/UsersContainer.tsx";
import Layoutt from "./Layoutt.tsx";
const DialogsContainer = React.lazy(
  () => import("./components/dialogs/DialogsContainer.tsx")
);
type PropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializApp: () => void;
};
class App extends Component<PropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <Layoutt />
      // <Suspense
      //   fallback={
      //     <div>
      //       <Preloader />
      //     </div>
      //   }
      // >
      //   <div className="app-wrapper">
      //     <HeaderContainer />
      //     <Navbar />
      //     <div className="app-wrapper-comntent">
      //       <Routes>
      //         <Route path="/dialogs" element={<DialogsContainer />} />
      //         <Route path="/profile/:userId?" element={<ProfileContainer />} />
      //         <Route path="/profile" element={<ProfileContainer />} />
      //         <Route
      //           path="/users"
      //           element={<UsersPage pageTitle="Самурай" />}
      //         />
      //         <Route path="/login" element={<Login />} />
      //       </Routes>
      //     </div>
      //   </div>
      // </Suspense>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializApp })
)(App);

const SamuraiJsApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SamuraiJsApp;
