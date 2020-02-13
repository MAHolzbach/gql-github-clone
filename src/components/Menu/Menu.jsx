import React, { useContext } from "react";
import DataContext from "../../DataContext";

const Menu = () => {
  const context = useContext(DataContext);
  const handleNavClick = context.handleNavClick;
  const currentView = context.currentView;

  return (
    <div className="pure-menu pure-menu-horizontal menu-wrapper">
      <ul className="pure-menu-list">
        <li
          className={`pure-menu-item ${currentView === "openIssues" ? "pure-menu-selected" : ""}`}
          onClick={e => handleNavClick(e)}
        >
          <div className="pure-menu-link menu-button" id="openIssues">
            OPEN ISSUES
          </div>
        </li>
        <li
          className={`pure-menu-item ${currentView === "closedIssues" ? "pure-menu-selected" : ""}`}
          onClick={e => handleNavClick(e)}
        >
          <div className="pure-menu-link menu-button" id="closedIssues">
            CLOSED ISSUES
          </div>
        </li>
        <li
          className={`pure-menu-item ${currentView === "pullRequests" ? "pure-menu-selected" : ""}`}
          onClick={e => handleNavClick(e)}
        >
          <div className="pure-menu-link menu-button" id="pullRequests">
            PULL REQUESTS
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
