import React from "react";

const Comment = ({ parentComment }) => {
  console.log(parentComment);
  return (
    <div>
      <div className="comment-wrapper">
        <h3>{parentComment.title}</h3>
        <p>by {parentComment.author.login}</p>
        <p>{parentComment.bodyText}</p>
      </div>
      {parentComment.comments.nodes.map((comment, i) => (
        <div className="response-wrapper" key={i}>
          <p className="response-text">by {comment.author.login}</p>
          <p className="response-text">{comment.bodyText}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
