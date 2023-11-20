import { type } from "@testing-library/user-event/dist/type";
import { profileAPI, userAPI } from "../../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likeCount: 12 },
    { id: 2, message: "Hi, how are you?", likeCount: 13 },
    { id: 3, message: "Hi, how are you?", likeCount: 14 },
    { id: 4, message: "Hi, how are you?", likeCount: 15 },
  ],
  newPostText: "it-kamasutra.com",
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
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
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => {
  return {
    type: ADD_POST,
    newPostText,
  };
};
export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};
export const setStatus = (status) => {
  return { type: SET_STATUS, status };
};
export const getUserProfile = (userId) => async (dispatch) => {
  let res = await userAPI.getProfile(userId);
  dispatch(setUserProfile(res.data));
};
export const getStatus = (userId) => async (dispatch) => {
  let res = await profileAPI.getStatus(userId);
  dispatch(setStatus(res.data));
};
export const updateStatus = (status) => async (dispatch) => {
  let res = profileAPI.updateStatus(status);
  if (res.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;
