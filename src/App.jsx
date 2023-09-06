import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/dialogs/Dialogs";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/myPost/profile/Profile";

function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-comntent">
        <Routes>
          <Route
            path="/dialogs"
            element={<Dialogs state={props.state.dialogsPage} />}
          />
          <Route
            path="/profile"
            element={<Profile state={props.state.profilePage} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
