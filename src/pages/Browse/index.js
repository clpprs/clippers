import React, { Suspense } from "react";

// Components
import { Clips } from "../../components/Clips";
import ContextMenu from "../../components/ContextMenu";
import Selecto from "react-selecto";

// State
import { selectedClipIdsAtom } from "../../recoil";
import { useSetRecoilState } from "recoil";

function SelectableClips(props) {
  const setSelectedClipIds = useSetRecoilState(selectedClipIdsAtom);

  return (
    <>
      <Clips />
      <Selecto
        container={"#selectable-container"}
        dragContainer={"#selectable-container"}
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

function Browse(props) {
  return (
    <>
      <SelectableClips />
      <Suspense fallback={null}>
        <ContextMenu />
      </Suspense>
    </>
  );
}

export default Browse;
