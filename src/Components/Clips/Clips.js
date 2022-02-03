import Clip from "./Clip";
import { clipAtom } from "../../recoil";
import { useRecoilValue } from "recoil";

function NoResult(props) {
  return (
    <div class="w-full h-full flex flex-1 justify-center items-center">
      <text className="text-2xl align-middle text-gray-500">
        No results found!
      </text>
    </div>
  );
}

function Clips(props) {
  const clips = useRecoilValue(clipAtom);
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
