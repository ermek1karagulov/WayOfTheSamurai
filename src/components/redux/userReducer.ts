import { BaseThunkType } from "./reduxStore";
import { UserType } from "../../types/Types";
import updateObjectInArray from "../../utils/objectHelpers.ts";
import { Dispatch } from "redux";
import { InferActionsTypes } from "./reduxStore";
import { userAPI } from "../../api/usersApi.ts";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>, //array of users ids
};

const userReducer = (
  state = initialState,
  action: ActionsType
): InitialState => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS: {
      return { ...state, users: action.users };
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      };
    }

    default:
      return state;
  }
};

export const actions = {
  followSucces: (userId: number) => {
    return {
      type: FOLLOW,
      userId,
    } as const;
  },
  unFollowSucces: (userId: number) => {
    return {
      type: UNFOLLOW,
      userId,
    } as const;
  },
  setUsers: (users: Array<UserType>) => {
    return {
      type: SET_USERS,
      users,
    } as const;
  },
  setCurrentPage: (currentPage: number) => {
    return {
      type: SET_CURRENT_PAGE,
      currentPage,
    } as const;
  },
  setUsersTotalCount: (totalUsersCount: number) => {
    return {
      type: SET_TOTAL_USERS_COUNT,
      count: totalUsersCount,
    } as const;
  },
  toggleIsFetching: (isFetching: boolean) => {
    return {
      type: TOGGLE_IS_FETCHING,
      isFetching,
    } as const;
  },
  toggleFollowingProgress: (isFetching: boolean, userId: number) => {
    return {
      type: TOGGLE_IS_FOLLOWING_PROGRESS,
      isFetching,
      userId,
    } as const;
  },
};

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    let data = await userAPI.getUsers(page, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setUsersTotalCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsType>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsType
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let res = await apiMethod(userId);
  if (res.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.follow.bind(userAPI),
      actions.followSucces
    );
  };
};

export const unFollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.unFollow.bind(userAPI),
      actions.unFollowSucces
    );
  };
};

export default userReducer;

export type InitialState = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
