import { FormAction, stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../../api/api.ts";
import { authAPI } from "../../api/authApi.ts";
import { type } from "os";
import { BaseThunkType, InferActionsTypes } from "./reduxStore.ts";
import { ChatAPI, ChatMessageType, StatusType } from "../../api/ChatAPI.ts";
import { Dispatch } from "redux";

const MESSAGES_RESEIVED = "MESSAGES_RESEIVED";
const STATUS_CHANGED = "STATUS_CHANGED";

let initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
};

const chatReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case MESSAGES_RESEIVED:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    case STATUS_CHANGED:
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: MESSAGES_RESEIVED,
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: STATUS_CHANGED,
      payload: { status },
    } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  ChatAPI.start();
  ChatAPI.subscribe("message-received", newMessageHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  ChatAPI.unsubscribe("message-received", newMessageHandlerCreator(dispatch));
  ChatAPI.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    ChatAPI.sendMessage(message);
  };

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
