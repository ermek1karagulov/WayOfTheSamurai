import { getAuthUserData } from "./authReducer.ts";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type initialStateType = {
  initialized: boolean;
};

let initialState: initialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};
export const itializedSuccess = (): initializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
});

export const initializApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(itializedSuccess());
  });
};

export default appReducer;
