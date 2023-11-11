import { combineReducers, legacy_createStore as createStore } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sideBarReducer from "./sidebarReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sideBarReducer,
  usersPage: userReducer,
  auth: authReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;
