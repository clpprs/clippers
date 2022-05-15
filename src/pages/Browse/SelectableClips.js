import React, { Suspense, useEffect, useState } from "react";
import classNames from "classnames";

// Components
import Clips from "./Clips";
import ContextMenu from "../../components/ContextMenu";
import Selecto from "react-selecto";
import { Loader } from "../../components";

// State
import { selectedClipIdsAtom } from "../../state";
import { useSetRecoilState } from "recoil";

import KeyController from "keycon";

const keycon = new KeyController();

function SelectableContainer(props) {
  const setSelectedClipIds = useSetRecoilState(selectedClipIdsAtom);

  const [shiftDown, setShiftDown] = useState(false);

  // Set the event listeners once
  useEffect(() => {
    keycon.keydown("shift", (e) => {
      setShiftDown(true);
    });
    keycon.keyup("shift", (e) => {
      setShiftDown(false);
    });
  }, [setShiftDown]);

  return (
    <>
      <div
        id="selectable-container"
        className={classNames("no-select", "min-w-full", "w-full")}
      >
        <Suspense fallback={<Loader />}>
          <Clips />
        </Suspense>
      </div>
      <Selecto
        container={"#selectable-container"}
        dragContainer={"#selectable-container"}
        selectableTargets={[".clip"]}
        selectByClick={shiftDown}
        selectFromInside={true}
        continueSelect={false}
        toggleContinueSelect={"shift"}
        keyContainer={window}
        hitRate={5}
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
    </>
  );
}

export function SelectableClips(props) {
  return (
    <>
      <SelectableContainer />
      <Suspense fallback={null}>
        <ContextMenu />
      </Suspense>
    </>
  );
}

export default SelectableClips;
