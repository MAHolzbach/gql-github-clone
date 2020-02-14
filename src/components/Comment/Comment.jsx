import React, { useContext, useState } from "react";
import DataContext from "../../DataContext";

const Comment = ({ parentComment }) => {
  const context = useContext(DataContext);
  const clearCommentsToRender = context.clearCommentsToRender;
  const [filterInput, setFilterInput] = useState("");
  const [subComments, setSubComments] = useState(parentComment.comments.nodes);

  const filterComments = e => {
    e.preventDefault();
    const filteredComments = parentComment.comments.nodes.filter(comment =>
      comment.bodyText.includes(filterInput)
    );
    setSubComments(filteredComments);
  };

  return (
    <div>
      <div className="comment-controls">
        <button className="pure-button pure-button-primary" onClick={clearCommentsToRender}>
          GO BACK
        </button>
        <form action="" className="pure-form">
          <label htmlFor="filterInput">FILTER COMMENTS:</label>
          <input
            className="form-item"
            type="text"
            id="filterInput"
            value={filterInput}
            onChange={e => setFilterInput(e.target.value)}
          />
          <button className="pure-button pure-button-primary" onClick={e => filterComments(e)}>
            FILTER
          </button>
          <button
            className="pure-button"
            onClick={e => {
              e.preventDefault();
              setSubComments(parentComment.comments.nodes);
            }}
          >
            CLEAR
          </button>
        </form>
      </div>
      <div className="comment-wrapper">
        <h3>{parentComment.title}</h3>
        <p>by {parentComment.author.login}</p>
        <p>{parentComment.bodyText}</p>
      </div>
      {subComments.map((comment, i) => (
        <div className="response-wrapper" key={i}>
          <p className="response-text">by {comment.author.login}</p>
          <p className="response-text">{comment.bodyText}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
