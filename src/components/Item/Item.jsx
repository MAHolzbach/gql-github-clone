import React from "react";
import Comment from "../Comment/Comment";

const Item = ({ item }) => {
  console.log(item);
  return (
    <div className="item-wrapper">
      <p>{item.title}</p>
      <p className="item-subtext">
        #{item.number} {item.createdAt} by {item.author.login}
      </p>
      <div className="item-comments">
        {item.comments.nodes.map(comment => (
          <Comment comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Item;
