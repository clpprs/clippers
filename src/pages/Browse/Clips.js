import React, { useEffect } from "react";
import styled from "styled-components";

// Components
import { Clip } from "../../components";

// State
import { clipsAtom } from "../../state";
import { useRecoilValue } from "recoil";
import config from "../../config";

const ClipsContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  width: 100%;
  height: 100%;
  padding: 0;
`;

function padArray(array, length, fill) {
  return length > array.length
    ? array.concat(Array(length - array.length).fill(fill))
    : array;
}
export function Clips(props) {
  const clips = padArray(useRecoilValue(clipsAtom), config.limit, {});
  // const clips = padArray([], config.limit, {});

  return (
    <ClipsContainer id="clips-container">
      {clips.map((clip) => (
        <Clip {...clip} key={clip._id} clickable />
      ))}
    </ClipsContainer>
  );
}

export default Clips;
