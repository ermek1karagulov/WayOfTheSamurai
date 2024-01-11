import React, { useEffect, useRef, useState } from "react";
import { ChatMessageType } from "../../api/ChatAPI";
import { useDispatch } from "react-redux";
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from "../../components/redux/chatReducer.ts";
import { useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../components/redux/reduxStore";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);
  return (
    <div>
      {status === "error" && (
        <div>Some error ocurred. Please refresh the page</div>
      )}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  );
};

const Messages: React.FC<{}> = ({}) => {
  const messagesAanchorRef = useRef<HTMLDivElement>(null);
  const messages = useSelector((state: AppStateType) => state.chat.messages);

  useEffect(() => {
    messagesAanchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ height: "400px", overflowY: "auto" }}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
      <div ref={messagesAanchorRef}></div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img style={{ width: "50px" }} src={message.photo} alt="" />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC<{}> = ({}) => {
  const [message, setMessage] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage("");
  };
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button disabled={status === "ready"} onClick={sendMessageHandler}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
