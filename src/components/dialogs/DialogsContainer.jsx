import React from "react";
import "./Dialogs.css";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import withAuthRedirect from "../../huc/withAuthRedirect";

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
  };
};
let authRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(authRedirectComponent);

export default DialogsContainer;
