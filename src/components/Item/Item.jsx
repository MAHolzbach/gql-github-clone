import React, { useContext } from "react";
import DataContext from "../../DataContext";

const Item = ({ item, id }) => {
  const context = useContext(DataContext);
  const handleItemClick = context.handleItemClick;

  return (
    <div className="item-wrapper" onClick={() => handleItemClick(id)}>
      <p>{item.title}</p>
      <p className="item-subtext">
        #{item.number} {item.createdAt} by {item.author.login}
      </p>
    </div>
  );
};

export default Item;
