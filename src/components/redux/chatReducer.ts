import { FormAction, stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../../api/api.ts";
import { authAPI } from "../../api/authApi.ts";
import { type } from "os";
import { BaseThunkType, InferActionsTypes } from "./reduxStore.ts";
import { ChatAPI, ChatMessageType } from "../../api/ChatAPI.ts";
import { Dispatch } from "redux";

const MESSAGES_RESEIVED = "MESSAGES_RESEIVED";

let initialState = {
  messages: [] as ChatMessageType[],
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
  ChatAPI.subscribe(newMessageHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  ChatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
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
