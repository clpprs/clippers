import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import "./context.css";

import TaggingField from "./TaggingField";

function ContextMenu(props) {
  const [cordinates, setCordinates] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const menuRef = useRef(null);

  // Bind event listeners
  useEffect(() => {
    // Right click handler
    function handleContextEvent(event) {
      event.preventDefault();
      if (!isVisible) setIsVisible(true);
      setCordinates({ x: event.pageX, y: event.pageY });
    }

    // Left click handler
    function handleClick(event) {
      // Only hide if user clicks outside of the context menu
      if (
        isVisible &&
        !menuRef.current.contains(event.target) &&
        !event.target.classList.contains("Mui-focused")
      ) {
        setIsVisible(false);
      }
    }

    // Bind event listeners
    document.addEventListener("contextmenu", handleContextEvent);
    document.addEventListener("click", handleClick);

    // Return cleanup function
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextEvent);
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      style={{
        position: "absolute",
        top: `${cordinates.y}px`,
        left: `${cordinates.x}px`,
        visibility: isVisible ? "visible" : "hidden",
      }}
      ref={menuRef}
      className={classNames(["context-menu"])}
    >
      <TaggingField />
    </div>
  );
}

export default ContextMenu;
