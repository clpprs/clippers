import classNames from "classnames";

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
import { Suspense } from "react";

function ClipList(props) {
  const clips = useRecoilValue(clipsAtom);
  return (
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
  );
}

function SelectoWrapper(props) {
  const setSelectedClipIds = useSetRecoilState(selectedClipIdsAtom);
  return (
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
          a.push(el.id);
          el.classList.add("selected");
        });
        e.removed.forEach((el) => {
          r.push(el.id);
          el.classList.remove("selected");
        });
        setSelectedClipIds((clips) =>
          [...clips, ...a].filter((c) => !r.includes(c))
        );
      }}
    />
  );
}

function Tagging(props) {
  return (
    <>
      <ClipList />
      <SelectoWrapper />
      <Suspense fallback={null}>
        <ContextMenu />
      </Suspense>
    </>
  );
}

module.hot.decline();

export default Tagging;
