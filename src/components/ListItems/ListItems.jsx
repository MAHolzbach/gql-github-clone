import React, { useContext } from "react";
import DataContext from "../../DataContext";
import Item from "../Item/Item";
import Comment from "../Comment/Comment";

const ListItems = () => {
  const context = useContext(DataContext);
  const currentView = context.currentView;
  const displayedData = context.displayedData;
  const openIssues = context.openIssues;
  const closedIssues = context.closedIssues;
  const pullRequests = context.pullRequests;
  const commentsToRender = context.commentsToRender;
  let itemsToRender;
  let viewTitle;

  switch (currentView) {
    case "openIssues":
      itemsToRender = openIssues;
      viewTitle = "Open Issues:";
      break;
    case "closedIssues":
      itemsToRender = closedIssues;
      viewTitle = "Closed Issues:";
      break;
    case "pullRequests":
      itemsToRender = pullRequests;
      viewTitle = "Pull Requests:";
      break;
  }

  return (
    <div>
      <h2>Current Organization and repo: {displayedData}</h2>
      {commentsToRender.length === 0 ? (
        <div>
          <h3>{viewTitle}</h3>
          {itemsToRender.map(item => (
            <Item item={item} key={item.id} id={item.id} />
          ))}
        </div>
      ) : (
        <div>
          <button className="pure-button pure-button-primary">GO BACK</button>
          {commentsToRender[0].comments.nodes.map(item => (
            <Comment comment={item} />
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default ListItems;
