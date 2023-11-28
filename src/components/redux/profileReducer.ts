import { stopSubmit } from "redux-form";
import { PhotosType, PostType, ProfileType } from "../../types/Types";
import { profileAPI } from "../../api/profileApi.ts";
import { ResultCodesEnum } from "../../api/api.ts";

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

export type initialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
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
type addPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostActionCreator = (
  newPostText: string
): addPostActionCreatorType => {
  return {
    type: ADD_POST,
    newPostText,
  };
};
type setUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): setUserProfileType => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};
type setStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setStatus = (status: string): setStatusActionType => {
  return { type: SET_STATUS, status };
};
type DeletePostActionCreator = {
  type: typeof DELETE_POST;
  postId: number;
};
export const deletePost = (postId: number): DeletePostActionCreator => ({
  type: DELETE_POST,
  postId,
});
type savePhotoSuccessActionCreator = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
export const savePhotoSuccess = (
  photos: PhotosType
): savePhotoSuccessActionCreator => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});
export const getUserProfile = (userId: number) => async (dispatch: any) => {
  let data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
};
export const getStatus = (userId: number) => async (dispatch: any) => {
  let data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data));
};
export const updateStatus = (status: string) => async (dispatch: any) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(setStatus(status));
  }
};

// export const savePhoto = (file: any) => async (dispatch: any) => {
//   let res = await profileAPI.savePhoto(file);

//   if (res.data.resultCode === 0) {
//     dispatch(savePhotoSuccess(res.data.data.photos));
//   }
// };

export const saveProfile =
  (profile: any) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
      return Promise.reject(data.messages[0]);
    }
  };

export default profileReducer;
