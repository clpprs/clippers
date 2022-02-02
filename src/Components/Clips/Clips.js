import Clip from "./Clip";
import { clips } from "../../recoil";
import { useRecoilValue } from "recoil";

function Clips(props) {
  const cliplist = useRecoilValue(clips);
  return (
    <div className="clips-container">
      <code>
        <pre>{JSON.stringify(cliplist, null, 2)}</pre>
      </code>
    </div>
  );
}

export default Clips;
