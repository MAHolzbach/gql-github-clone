import React, { useContext } from "react";
import DataContext from "../../DataContext";
import Item from "../Item/Item";

const ListItems = () => {
  const context = useContext(DataContext);
  const currentView = context.currentView;
  const displayedData = context.displayedData;
  const openIssues = context.openIssues;
  const closedIssues = context.closedIssues;
  const pullRequests = context.pullRequests;
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
      <h3>{viewTitle}</h3>
      {itemsToRender.map(item => (
        <Item item={item} />
      ))}
    </div>
  );
};

export default ListItems;
