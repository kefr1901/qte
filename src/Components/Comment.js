import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ReplyComment from "./ReplyComment";

const Comment = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [replies, setReplies] = useState([]);
  const [posts, setPosts] = useState([]);
  const [triggerComments, setTriggerComments] = useState(false)

  //loading and retrieving posts on loadscreen.
  useEffect(() => {
    axios.get("http://localhost:4000/app/").then((response) => {
      // console.log(response);
      {
        setPosts(response.data);
      }
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/app/reply").then((response) => {
      console.log(response);
      {
        setReplies(response.data);
        setTriggerComments(false);
      }
      console.log(replies);
    });
  }, [triggerComments]);

  ///////Post a new comment with on click ///////
  const postComment = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/app/postcomment", {
        name: name,
        comment: comment,
      })
      .then((response) => {
        //console.log(response);
        setName("")
        setComment("")
        getComments();
      });
  };

  ////// Get comments, gets called from new comment ///////
  const getComments = (e) => {
    //e.preventDefault();
    axios.get("http://localhost:4000/app/").then((response) => {
      console.log(response);
      {
        setPosts(response.data);
      }
      console.log(response.data);
    });
  };


  return (
    <div>
      <form>
        <div className="form-group ">
          <h1>Create a new post</h1>
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="name"
            className="form-control"
            id="name"
            placeholder="Name"
          />
          <label htmlFor="comment">Comment</label>
          <input
           value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Comment"
            className="form-control"
            id="comment"
            rows="3"
          ></input>
          <button
            onClick={postComment}
            type="submit"
            value="submit"
            className="btn btn-danger"> Create a new comment
          </button>
        </div>
      </form>

      <div className="comment-container ">
        {posts.map((post, i) => (
          <div key={post.comment + i}> 
            <div  className="">
              <div className="card">
                <div className="card-body text-black m-3 p-1">
                 <p>{post.name} says: {post.comment}</p> 
                </div>
              </div>
            </div>
            <p className="responses">Responses: </p>
            {replies
              .filter((reply) => reply.commentId === post._id)
              .map((reply, i) => (
                <div key={reply.comment + i} className="card">
                  <div className="card-body text-black m-1 p-1">
                    {reply.name} says: {reply.comment}
                  </div>
                </div>
              ))}
            <ReplyComment
              // replyComment={replyComment}
              post={post}
              setTriggerComments={setTriggerComments}
            />
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
