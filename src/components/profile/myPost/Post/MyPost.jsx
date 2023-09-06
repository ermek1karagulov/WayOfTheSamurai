import React from "react";
import "./MyPost.css";

const Post = (props) => {
  return (
    <div>
      {props.message}
      {props.likeCount}
    </div>
  );
};

let newPostElement = React.createRef();

let addPost = () => {
  let text = newPostElement.current.value;
  alert(text);
};

const MyPost = (props) => {
  let postsElements = props.posts.map((p) => {
    return <Post message={p.message} likeCount={p.likeCount} key={p.id} />;
  });
  return (
    <div className="postsBlock">
      <h3>My post</h3>
      <div>
        <textarea ref={newPostElement}></textarea>
      </div>
      <div>
        <button onClick={addPost}>Add post</button>
      </div>
      <div className="posts">{postsElements}</div>
    </div>
  );
};

export default MyPost;
