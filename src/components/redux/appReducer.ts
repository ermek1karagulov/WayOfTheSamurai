import { getAuthUserData } from "./authReducer.ts";
import { InferActionsTypes } from "./reduxStore.ts";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
  initialized: false,
};
export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const appReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
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

const actions = {
  itializedSuccess: () => ({ type: INITIALIZED_SUCCESS, a: 32 }),
};

export const initializApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(actions.itializedSuccess());
  });
};

export default appReducer;
