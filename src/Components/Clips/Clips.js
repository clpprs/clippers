import classNames from "classnames";

// Components
import Clip from "./Clip";

// Components
import NoResult from "../NoResult";

// State
import { clipsAtom } from "../../state";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const ClipsContainer = styled.div``;

function Clips(props) {
  const clips = useRecoilValue(clipsAtom);

  return (
    <ClipsContainer
      id="clips-container"
      className={classNames([
        clips.length ? "grid" : "block",
        "grid-flow-row",
        "grid-cols-4",
        "px-8",
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
    </ClipsContainer>
  );
}

export default Clips;
