import { type } from "os";

let subscribers = {
  "message-received": [] as MessagesReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscribedType[],
};

let wc: WebSocket | null = null;
type EventsNamesType = "message-received" | "status-changed";

const closeHandler = () => {
  console.log("close wc");
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["message-received"].forEach((s) => s(newMessages));
};

const cleanUp = () => {
  wc?.removeEventListener("close", closeHandler);
  wc?.removeEventListener("message", messageHandler);
};

function createChannel() {
  cleanUp();
  wc?.close();
  wc = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  wc.addEventListener("close", closeHandler);
  wc.addEventListener("message", messageHandler);
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
    callback: MessagesReceivedSubscriberType
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
export type StatusType = "pending" | "ready";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
