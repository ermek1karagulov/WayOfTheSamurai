import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/dialogs/Dialogs";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/myPost/profile/Profile";
import store from "./components/redux/state";

function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-comntent">
        <Routes>
          <Route path="/dialogs" element={<Dialogs store={props.store} />} />
          <Route
            path="/profile"
            element={
              <Profile
                state={props.state.profilePage}
                dispatch={props.dispatch}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
