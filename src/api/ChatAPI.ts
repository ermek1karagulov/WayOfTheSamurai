let subscribes = [] as SubscriberType[];

let wc: WebSocket | null = null;

const closeHandler = () => {
  console.log("close wc");
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribes.forEach((s) => s(newMessages));
};

function createChannel() {
  wc?.removeEventListener("close", closeHandler);
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
    subscribes = [];
    ws?.removeEventListener("close", closeHandler);
    wc?.removeEventListener("message", messageHandler);
    wc?.close();
  },
  subscribe(callback: SubscriberType) {
    subscribes.push(callback);
    return () => {
      subscribes = subscribes.filter((s) => s !== callback);
    };
  },
  unsubscribe(callback: SubscriberType) {
    subscribes = subscribes.filter((s) => s !== callback);
  },
  sendMessage(message: string) {
    wc?.send(message);
  },
};

type SubscriberType = (messages: ChatMessageType[]) => void;
export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
