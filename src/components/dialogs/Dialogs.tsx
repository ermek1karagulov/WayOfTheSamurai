import React from "react";
import "./Dialogs.css";
import DialogItem from "./DialogItem/DialogItem.tsx";
import Message from "./Message/Message.tsx";
import AddMessageForm from "./addMessageForm/AddMessageForm.tsx";
import { InitialStateType } from "../redux/dialogsReducer";

type PropsType = {
  dialogsPage: InitialStateType;
  sendMessage: (mesageText: string) => void;
};

const Dialogs: React.FC<PropsType> = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));
  let messagesElements = state.messages.map((m) => (
    <Message message={m.messages} key={m.id} />
  ));
  let addNewMessage = (values: { newMessageBody: string }) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className="dialogs">
      <div className="dialogs-item">{dialogsElements}</div>
      <div className="messages">
        <div>{messagesElements}</div>
        lmkdmm
        <AddMessageForm />
      </div>
    </div>
  );
};

export default Dialogs;
