import { AppStateType } from "./reduxStore";
import { userAPI } from "../../api/api.tsx";
import { UserType } from "../../types/Types";
import updateObjectInArray from "../../utils/objectHelpers";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk/es/types";

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

type InitialState = typeof initialState;

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

type ActionsType =
  | followSuccesActionCreator
  | unfollowSuccesActionCreator
  | setUsersActionCreator
  | setCurrentPageActionCreator
  | setUsersTotalCountActionCreator
  | toggleIsFetchingActionCreator
  | toggleFollowingProgressActionCreator;

type followSuccesActionCreator = {
  type: typeof FOLLOW;
  userId: number;
};
export const followSucces = (userId: number): followSuccesActionCreator => {
  return {
    type: FOLLOW,
    userId,
  };
};
type unfollowSuccesActionCreator = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unFollowSucces = (userId: number): unfollowSuccesActionCreator => {
  return {
    type: UNFOLLOW,
    userId,
  };
};
type setUsersActionCreator = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): setUsersActionCreator => {
  return {
    type: SET_USERS,
    users,
  };
};
type setCurrentPageActionCreator = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (
  currentPage: number
): setCurrentPageActionCreator => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};
type setUsersTotalCountActionCreator = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};
export const setUsersTotalCount = (
  totalUsersCount: number
): setUsersTotalCountActionCreator => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  };
};
type toggleIsFetchingActionCreator = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetching = (
  isFetching: boolean
): toggleIsFetchingActionCreator => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
};
type toggleFollowingProgressActionCreator = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): toggleFollowingProgressActionCreator => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
  };
};

type GetState = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    let data = await userAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (
    userId: number
  ) => followSuccesActionCreator | unfollowSuccesActionCreator
) => {
  dispatch(toggleFollowingProgress(true, userId));
  let res = await apiMethod(userId);
  if (res.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.follow.bind(userAPI),
      followSucces
    );
  };
};

export const unFollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.unFollow.bind(userAPI),
      unFollowSucces
    );
  };
};

export default userReducer;
