import { type } from "os";

let subscribers = {
  "message-received": [] as MessagesReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscribedType[],
};

let wc: WebSocket | null = null;
type EventsNamesType = "message-received" | "status-changed";

const closeHandler = () => {
  notifySubscribersAboutStatus("pending");
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["message-received"].forEach((s) => s(newMessages));
};
const openHandler = () => {
  notifySubscribersAboutStatus("ready");
};
const errorHandler = () => {
  notifySubscribersAboutStatus("error");
  console.log("restart page");
};

const cleanUp = () => {
  wc?.removeEventListener("close", closeHandler);
  wc?.removeEventListener("message", messageHandler);
  wc?.removeEventListener("open", openHandler);
  wc?.removeEventListener("error", errorHandler);
};

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers["status-changed"].forEach((s) => s("pending"));
};

function createChannel() {
  cleanUp();
  wc?.close();
  wc = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  notifySubscribersAboutStatus("pending");
  wc.addEventListener("close", closeHandler);
  wc.addEventListener("message", messageHandler);
  wc.addEventListener("open", openHandler);
  wc.addEventListener("error", errorHandler);
}

export const ChatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers["message-received"] = [];
    subscribers["status-changed"] = [];
    cleanUp();
    wc?.close();
  },
  subscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscribedType
  ) {
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(
        (s) => s !== callback
      );
    };
  },
  unsubscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscribedType
  ) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      (s) => s !== callback
    );
  },
  sendMessage(message: string) {
    wc?.send(message);
  },
};

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscribedType = (status: StatusType) => void;
export type StatusType = "pending" | "ready" | "error";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
