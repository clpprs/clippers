import React, { useEffect, useState } from "react";

// Selection handler
import Selecto from "react-selecto";

// Keyboard listener
import KeyController from "keycon";

// State
import { selectedClipIdsAtom } from "../../state";
import { useRecoilState } from "recoil";

// Link disabler event handler
const prevent = (e) => e.preventDefault();

export function SelectoWrapper(props) {
  const [selectedClipIds, setSelectedClipIds] =
    useRecoilState(selectedClipIdsAtom);
  const [shiftDown, setShiftDown] = useState(false);
  const [linksAreClickable, setLinksAreClickable] = useState(true);

  // Get the selection container ID from props, could use a ref
  const containerQuerySelector = `#${props.containerID}`;

  // Helper function to check if any clips are selected
  const areSelected = () => !!selectedClipIds.length;

  // Helper function to toggleLinks
  const toggleLinks = (enable) => {
    if (enable && linksAreClickable) return;
    if (!enable && !linksAreClickable) return;

    // Find all links inside the selection container
    const links = document.querySelectorAll(`${containerQuerySelector} a`);
    // Add or remove the event handler from all links
    links.forEach(function (link) {
      enable
        ? link.removeEventListener("click", prevent)
        : link.addEventListener("click", prevent);
    });
    setLinksAreClickable(enable);
  };

  // Create KeyController, bind event handlers and clean it up
  useEffect(() => {
    const keycon = new KeyController();

    function handleKeyEvent(up) {
      if (shiftDown == up) return;
      setShiftDown(up);
      if (!up && areSelected()) return;
      toggleLinks(!up);
    }

    keycon.keydown("shift", (e) => handleKeyEvent(true));
    keycon.keyup("shift", (e) => handleKeyEvent(false));

    return function cleanup() {
      keycon.destroy();
    };
  });

  return (
    <Selecto
      container={containerQuerySelector}
      dragContainer={containerQuerySelector}
      selectableTargets={[".clip"]}
      selectByClick={shiftDown}
      selectFromInside={true}
      preventDragFromInside={false}
      continueSelect={false}
      toggleContinueSelect={"shift"}
      keyContainer={window}
      hitRate={5}
      onDrag={(e) => {
        if (!shiftDown) e.stop();
      }}
      onSelect={(e) => {
        let added = [];
        let removed = [];
        e.added.forEach((el) => {
          el.classList.add("selected");
          added.push(el.id);
        });
        e.removed.forEach((el) => {
          el.classList.remove("selected");
          removed.push(el.id);
        });
        setSelectedClipIds((clips) =>
          [...clips, ...added].filter((c) => !removed.includes(c))
        );
      }}
      onSelectEnd={() => {
        if (!areSelected() && !linksAreClickable && !shiftDown)
          setTimeout(() => toggleLinks(true), 10);
      }}
    />
  );
}

export default SelectoWrapper;
