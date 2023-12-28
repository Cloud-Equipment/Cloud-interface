import React from "react";
import Sidebar from "./Sidebar";

function LayoutWithSidebar(props) {
  return (
    <div>
      <div className="LayoutWithSidebar">
        <div className="left">
          <Sidebar />
        </div>
        <div className="right">{props.children}</div>
      </div>
    </div>
  );
}

export default LayoutWithSidebar;
