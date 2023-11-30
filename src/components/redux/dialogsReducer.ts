import { type } from "os";
import { InferActionsTypes } from "./reduxStore";

const SEND_MESSAGE = "SEND-MESSAGE";

type DialogType = {
  id: number;
  name: string;
};
type MessageType = {
  id: number;
  name: string;
};
let initialState = {
  dialogs: [
    { id: 1, name: "Dimych" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Victor" },
    { id: 6, name: "Valera" },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How are you" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
    { id: 5, message: "Yo" },
  ] as Array<MessageType>,
};

export const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      };

    default:
      return state;
  }
  return state;
};

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({
      type: SEND_MESSAGE,
      newMessageBody,
    } as const),
};

export default dialogsReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
