import React from "react";

const Menu = () => {
  return (
    <div className="pure-menu pure-menu-horizontal menu-wrapper">
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <div className="pure-menu-link menu-button">OPEN ISSUES</div>
        </li>
        <li className="pure-menu-item">
          <div className="pure-menu-link menu-button">CLOSED ISSUES</div>
        </li>
        <li className="pure-menu-item">
          <div className="pure-menu-link menu-button">PULL REQUESTS</div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
