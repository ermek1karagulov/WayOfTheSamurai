import React from "react";
import "./../Dialogs.css";

const Message = (message: string | any) => {
  return <div className="dialog">{message}</div>;
};

export default Message;
