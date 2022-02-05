import classNames from "classnames";

// Components
import Clip from "./Clip";

// Components
import NoResult from "../NoResult";

// State
import { clipsAtom } from "../../recoil";
import { useRecoilValue } from "recoil";
function Clips(props) {
  const clips = useRecoilValue(clipsAtom);

  return (
    <div
      id="selectable-container"
      className={classNames([
        clips.length ? "grid" : "block",
        "clips-container",
        "justify-around",
        "min-w-full",
        "min-h-full",
        "w-full",
        "h-full",
      ])}
    >
      {!clips.length ? (
        <NoResult />
      ) : (
        clips.map((clip) => <Clip clip={clip} key={clip._id} />)
      )}
    </div>
  );
}

export default Clips;
