import { type } from "os";
import React, { useEffect, useState } from "react";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const [wcChannel, setWcChannel] = useState<WebSocket | null>(null);
  useEffect(() => {
    let wc: WebSocket;
    const closeHandler = () => {
      console.log("close wc");
      setTimeout(createChannel, 3000);
    };

    function createChannel() {
      wc?.removeEventListener("close", closeHandler);
      wc?.close();

      wc = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
      );
      wc.addEventListener("close", closeHandler);
      setWcChannel(wc);
    }
    createChannel();
    return () => {
      wc.removeEventListener("close", closeHandler);
      wc.close();
    };
  }, []);

  return (
    <div>
      <Messages wcChannel={wcChannel} />
      <AddMessageForm wcChannel={wcChannel} />
    </div>
  );
};

const Messages: React.FC<{ wcChannel: WebSocket | null }> = ({ wcChannel }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };
    wcChannel?.addEventListener("message", messageHandler);
    return () => {
      wcChannel?.removeEventListener("message", messageHandler);
    };
  }, [wcChannel]);

  return (
    <div style={{ height: "400px", overflowY: "auto" }}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
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

const AddMessageForm: React.FC<{ wcChannel: WebSocket | null }> = ({
  wcChannel,
}) => {
  const [message, setMessage] = useState("");
  const [readytatus, setReadyStatus] = useState<"pending" | "ready">("pending");

  useEffect(() => {
    let openHandler = () => {
      setReadyStatus("ready");
    };
    wcChannel?.addEventListener("open", openHandler);
    return () => {
      wcChannel?.removeEventListener("open", openHandler);
    };
  }, [wcChannel]);

  const sendMessage = () => {
    if (!message) {
      return;
    }
    wcChannel?.send(message);
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
        <button
          disabled={wcChannel === null || readytatus !== "ready"}
          onClick={sendMessage}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
