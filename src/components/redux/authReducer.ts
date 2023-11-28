import { FormAction, stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../../api/api.ts";
import { authAPI } from "../../api/authApi.ts";
import { type } from "os";
import { BaseThunkType, InferActionsTypes } from "./reduxStore.ts";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: SET_USER_DATA,
      payload: { userId, email, login, isAuth },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let Medata = await authAPI.me();
  if (Medata.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = Medata.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};
export const login =
  (email: string, password: number, rememberMe: any): ThunkType =>
  async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };

export const logout = (): ThunkType => async (dispatch) => {
  let res = await authAPI.logout();
  if (res.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
