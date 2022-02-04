import classNames from "classnames";

// Components
import { Clip } from "../../components/Clips";

// State
import { clipsAtom, selectedClipsAtom } from "../../recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";

// Selecto
import Selecto from "react-selecto";

// Styles
import "./tagging.css";

function Tagging(props) {
  const clips = useRecoilValue(clipsAtom);
  const setSelectedClips = useSetRecoilState(selectedClipsAtom);

  // const selectedClips = useRecoilValue(selectedClipsAtom);

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
            a.push(el.id);
            el.classList.add("selected");
          });
          e.removed.forEach((el) => {
            r.push(el.id);
            el.classList.remove("selected");
          });
          setSelectedClips((clips) =>
            [...clips, ...a].filter((c) => !r.includes(c))
          );
        }}
      />
    </>
  );
}

export default Tagging;
