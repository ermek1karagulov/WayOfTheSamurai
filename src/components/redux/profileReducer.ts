import { FormAction, stopSubmit } from "redux-form";
import { PhotosType, PostType, ProfileType } from "../../types/Types";
import { profileAPI } from "../../api/profileApi.ts";
import { ResultCodesEnum } from "../../api/api.ts";
import { BaseThunkType, InferActionsTypes } from "./reduxStore.ts";
import { type } from "os";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const DELETE_POST = "DELETE_POST";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likeCount: 12 },
    { id: 2, message: "Hi, how are you?", likeCount: 13 },
    { id: 3, message: "Hi, how are you?", likeCount: 14 },
    { id: 4, message: "Hi, how are you?", likeCount: 15 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
};

const profileReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likeCount: 1,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addPostActionCreator: (newPostText: string) => {
    return {
      type: ADD_POST,
      newPostText,
    } as const;
  },
  setUserProfile: (profile: ProfileType) => {
    return {
      type: SET_USER_PROFILE,
      profile,
    } as const;
  },
  setStatus: (status: string) => {
    return { type: SET_STATUS, status } as const;
  },
  deletePost: (postId: number) =>
    ({
      type: DELETE_POST,
      postId,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: SAVE_PHOTO_SUCCESS,
      photos,
    } as const),
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
  };
export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
  };
export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch: any) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setStatus(status));
    }
  };

export const saveProfile =
  (profile: any): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
      if (userId != null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can*t br null");
      }
    } else {
      dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
      return Promise.reject(data.messages[0]);
    }
  };

export default profileReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
