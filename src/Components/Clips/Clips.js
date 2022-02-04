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
      className={`${
        clips.length ? "grid" : "block"
      } clips-container min-w-full w-full min-h-full h-full justify-around`}
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
