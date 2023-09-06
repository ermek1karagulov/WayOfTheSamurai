import React from "react";
import "./Dialogs.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
// import { NavLink } from "react-router-dom";

const Dialogs = (props) => {
  let dialogsElements = props.state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} />
  ));
  let messagesElements = props.state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  return (
    <div className="dialogs">
      <div className="dialogs-item">{dialogsElements}</div>
      <div className="messages">{messagesElements}</div>
    </div>
  );
};

export default Dialogs;
