import React from "react";
import styled from "styled-components";

// Components
import Clip from "../../components/Clip";

// State
import { clipsAtom } from "../../state";
import { useRecoilValue } from "recoil";

const ClipsContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  width: 100%;
  height: 100%;
  padding: 0 2rem;
`;

export function Clips(props) {
  const clips = useRecoilValue(clipsAtom);
  return (
    <ClipsContainer id="clips-container">
      {clips.map((clip) => (
        <Clip clip={clip} key={clip._id} clickable />
      ))}
    </ClipsContainer>
  );
}

export default Clips;
