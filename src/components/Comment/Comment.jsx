import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <h3>{comment.bodyText}</h3>
    </div>
  );
};

export default Comment;
