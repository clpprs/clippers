import React, { useEffect, useState } from "react";

import Selecto from "react-selecto";

// State
import { selectedClipIdsAtom } from "../../state";
import { useSetRecoilState } from "recoil";
import KeyController from "keycon";

const keycon = new KeyController();
let globalShiftDown = false;

export function SelectoWrapper(props) {
  const containerQuerySelector = `#${props.containerID}`;
  const setSelectedClipIds = useSetRecoilState(selectedClipIdsAtom);
  const [shiftDown, setShiftDown] = useState(false);

  const prevent = (e) => e.preventDefault();

  // Set the event listeners once
  useEffect(() => {
    function handleKeyEvent(up) {
      // Have to use  setShiftDown and globalShiftDown because the keycon
      // event functions do not re-evaluate when component state changes
      if (globalShiftDown == up) return;
      globalShiftDown = up;
      setShiftDown(up);
      // We use the containerID passed in props to disable all
      // link onClick events inside the container when shift is down
      const links = document.querySelectorAll(`${containerQuerySelector} a`);
      links.forEach(function (link) {
        up
          ? link.addEventListener("click", prevent)
          : link.removeEventListener("click", prevent);
      });
    }

    keycon.keydown("shift", (e) => handleKeyEvent(true));
    keycon.keyup("shift", (e) => handleKeyEvent(false));
  }, [setShiftDown]);

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
        let a = [];
        let r = [];
        e.added.forEach((el) => {
          el.classList.add("selected");
          a.push(el.id);
        });
        e.removed.forEach((el) => {
          el.classList.remove("selected");
          r.push(el.id);
        });
        setSelectedClipIds((clips) =>
          [...clips, ...a].filter((c) => !r.includes(c))
        );
      }}
    />
  );
}

export default SelectoWrapper;
