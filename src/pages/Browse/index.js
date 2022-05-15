import React from "react";
import styled from "styled-components";

import Sidebar from "../../components/Sidebar";
import SelectableClips from "./SelectableClips";

const BrowseContent = styled.div`
  overflow-y: scroll;
  width: 100%;

  &::after {
    display: block;
    height: 16rem;
    width: 100%;
    // Scryfall reference
    content: "This search is finished. Now the real work can begin.";
    line-height: 16rem;
    text-align: center;
    vertical-align: middle;
    font-style: italic;
    font-size: 0.8rem;
    opacity: 0.25;
  }
`;

function Browse(props) {
  return (
    <>
      <Sidebar />
      <BrowseContent>
        <SelectableClips />
      </BrowseContent>
    </>
  );
}

export default Browse;
