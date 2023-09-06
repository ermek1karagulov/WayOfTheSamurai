import React from "react";
import "./../Dialogs.css";

const Message = (props) => {
  return <div className="dialog">{props.message}</div>;
};

export default Message;
