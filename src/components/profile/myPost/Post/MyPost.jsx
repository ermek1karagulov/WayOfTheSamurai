import React from "react";
import "./MyPost.css";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../redux/state";

const Post = (props) => {
  return (
    <div>
      {props.message}
      {props.likeCount}
    </div>
  );
};

const MyPost = (props) => {
  let postsElements = props.posts.map((p) => {
    return <Post message={p.message} likeCount={p.likeCount} key={p.id} />;
  });

  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostActionCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    let action = updateNewPostTextActionCreator(text);
    props.dispatch(action);
  };
  return (
    <div className="postsBlock">
      <h3>My post</h3>
      <div>
        <textarea
          onChange={() => onPostChange(props.updateNewPostText)}
          ref={newPostElement}
          value={props.newPostText}
        ></textarea>
      </div>
      <div>
        <button onClick={() => addPost(props.dispatch)}>Add post</button>
      </div>
      <div className="posts">{postsElements}</div>
    </div>
  );
};

export default MyPost;
