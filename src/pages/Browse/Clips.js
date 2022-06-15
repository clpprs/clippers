import React, { useEffect } from "react";
import styled from "styled-components";

// Components
import { Clip } from "../../components";

// State
import { clipsState, selectedClipIdsState } from "../../state";
import { useRecoilValue } from "recoil";

const ClipsContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  width: 100%;
  height: 100%;
  padding: 0;
  gap: 0rem;

  &.selection-present .clip:not(.selected, :hover) {
    filter: grayscale(1);
  }
`;

export function Clips(props) {
  const clips = useRecoilValue(clipsState);
  const selectedClipIds = useRecoilValue(selectedClipIdsState);

  return (
    <ClipsContainer
      id="clips-container"
      className={selectedClipIds.length ? "selection-present" : ""}
    >
      {clips.map((clip) => (
        <Clip {...clip} key={clip._id} clickable />
      ))}
    </ClipsContainer>
  );
}

export default Clips;
