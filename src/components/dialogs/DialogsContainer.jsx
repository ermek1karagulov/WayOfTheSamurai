import React from "react";
import "./Dialogs.css";
import { sendMessageCreator } from "../redux/dialogsReducer.ts";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import withAuthRedirect from "../../huc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
