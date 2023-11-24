import dialogsReducer from "./dialogsReducer.ts";
import profileReducer from "./profileReducer.ts";
import sidebarReducer from "./sidebarReducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you?", likeCount: 12 },
        { id: 2, message: "Hi, how are you?", likeCount: 13 },
        { id: 3, message: "Hi, how are you?", likeCount: 14 },
        { id: 4, message: "Hi, how are you?", likeCount: 15 },
      ],
      newPostText: "it-kamasutra.com",
    },

    dialogsPage: {
      dialogs: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Andrey" },
        { id: 3, name: "Sveta" },
        { id: 4, name: "Sasha" },
        { id: 5, name: "Victor" },
        { id: 6, name: "Valera" },
      ],
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo" },
      ],
      newMessageBody: [],
    },
    sidebar: {},
  },
  renderEntireTree() {
    console.log("state");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._renderEntireTree = observer;
  },

  _addPost() {
    let newPost = {
      id: 5,
      message: this._state.profilePage.newPostText,
      likeCount: 1,
    };
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = "";
    this._renderEntireTree(this._state);
  },
  _updateNewPostText(newText) {
    this._state.profilePage.newPostText = newText;
    this._renderEntireTree(this._state);
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.profilePage, action);

    this._renderEntireTree(this._state);
  },
};

window.store = store;
export default store;
