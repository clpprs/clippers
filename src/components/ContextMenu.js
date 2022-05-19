import React, { Suspense, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styled from "styled-components";

// Components
import TaggingField from "./TaggingField";

const ContextMenuContainer = styled.div`
  background-color: #fff;
  border-radius: 0.25rem;
  z-index: 9999;
`;

export function ContextMenu(props) {
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
      if (!isVisible) return;
      // Hide the menu if the ref points to null
      // this sometimes happens when clips are
      // selected and you click out of the menu
      if (menuRef.current == null) {
        return setIsVisible(false);
      }
      // Only hide if user clicks outside of the context menu
      if (
        !menuRef.current.contains(event.target) &&
        !event.target.classList.contains("Mui-focused") &&
        !event.target.classList.contains("MuiAutocomplete-option")
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
  }, [isVisible, setCordinates]);

  return (
    <ContextMenuContainer
      id="context-menu"
      style={{
        position: "absolute",
        top: `${cordinates.y}px`,
        left: `${cordinates.x}px`,
        visibility: isVisible ? "visible" : "hidden",
      }}
      ref={menuRef}
      className={classNames("p-2", "w-96")}
    >
      <Suspense fallback={null}>
        <TaggingField className="context-menu-item" />
      </Suspense>
    </ContextMenuContainer>
  );
}

export default ContextMenu;
