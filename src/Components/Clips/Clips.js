import Clip from "./Clip";
import { clipAtom } from "../../recoil";
import { useRecoilValue } from "recoil";

function Clips(props) {
  const clips = useRecoilValue(clipAtom);
  return (
    <div className="clips-container w-full justify-around">
      {clips.map((clip) => (
        <Clip clip={clip} key={clip._id} />
      ))}
    </div>
  );
}

export default Clips;
