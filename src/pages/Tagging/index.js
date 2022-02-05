import React, { Suspense } from "react";

// Components
import { Clip } from "../../components/Clips";
import ContextMenu from "./ContextMenu";

// State
import { clipsAtom, selectedClipIdsAtom } from "../../recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";

// Selecto
import Selecto from "react-selecto";

// Styles
import "./tagging.css";
import classNames from "classnames";

function ClipList(props) {
  const clips = useRecoilValue(clipsAtom);
  const setSelectedClipIds = useSetRecoilState(selectedClipIdsAtom);

  return (
    <>
      <div
        id="tagging-container"
        className={classNames([
          clips.length ? "grid" : "block",
          "tagging-container",
          "justify-around",
          "min-w-full",
          "min-h-full",
          "w-full",
          "h-full",
        ])}
      >
        {clips.map((clip) => (
          <Clip clip={clip} key={clip._id} />
        ))}
      </div>
      <Selecto
        container={"#tagging-container"}
        dragContainer={"#tagging-container"}
        selectableTargets={[".clip-container"]}
        selectByClick={true}
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

function Tagging(props) {
  return (
    <>
      <ClipList />
      <Suspense fallback={null}>
        <ContextMenu />
      </Suspense>
    </>
  );
}

export default Tagging;
