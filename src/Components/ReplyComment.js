import React, { useState } from "react";
import axios from "axios";

const Reply = (props) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  ///////Reply to post///////
  const replyComment = (e) => {
    //console.log(props)
    const commentId = e.target.id;
    e.preventDefault();
    console.log(name, comment, commentId);

    axios
      .post("http://localhost:4000/app/postcomment/id", {
        name: name,
        comment: comment,
        commentId: e.target.id,
      })
      .then((response) => {
        console.log(response);
        setName("")
        setComment("")
        props.setTriggerComments(true);
      });
  };

  return (
    <form className="respond-form p-2 m-2">
      <input
      value={name}
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
      value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        placeholder="Comment"
      ></input>
      <button
        id={props.post._id}
        onClick={replyComment}
        className="btn btn-primary"
      >
        {" "}
        Respond to post{" "}
      </button>
    </form>
  );
};

export default Reply;
