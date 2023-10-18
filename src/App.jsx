import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/myPost/profile/Profile";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";

function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-comntent">
        <Routes>
          <Route path="/dialogs" element={<DialogsContainer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UsersContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
