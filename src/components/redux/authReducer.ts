import { stopSubmit } from "redux-form";
import { authAPI } from "../../api/api";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
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

type setAuthUserDataPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};
type setAuthUserDataType = {
  type: typeof SET_USER_DATA;
  payload: setAuthUserDataPayloadType;
};

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): setAuthUserDataType => {
  return {
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth },
  };
};

export const getAuthUserData = () => async (dispatch: any) => {
  let res = await authAPI.me();
  if (res.data.resultCode === 0) {
    let { id, email, login } = res.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: number, rememberMe: any) =>
  async (dispatch: any) => {
    let res = await authAPI.login(email, password, rememberMe);
    if (res.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      let message =
        res.data.messages.length > 0 ? res.data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };

export const logout = () => async (dispatch: any) => {
  let res = await authAPI.logout();
  if (res.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
