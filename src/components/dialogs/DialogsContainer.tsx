import React from "react";
import "./Dialogs.css";
import { actions } from "../redux/dialogsReducer.ts";
import Dialogs from "./Dialogs.tsx";
import { connect } from "react-redux";
import withAuthRedirect from "../../huc/withAuthRedirect.tsx";
import { compose } from "redux";
import { AppStateType } from "../redux/reduxStore.ts";

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect
)(Dialogs);
