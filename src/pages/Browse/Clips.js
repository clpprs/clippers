import React, { useEffect, useRef } from "react";
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
  min-width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 0;
  gap: 0rem;

  &.highlight-present .clip:not(.highlight) video {
    filter: saturate(2) blur(100px);
  }

  &.highlight-present .clip.highlight video {
    z-index: 999; /* Raise highglighted videos above the blur */
    position: relative;
  }

  &.selection-present .clip:not(.selected, :hover) {
    filter: grayscale(1);
  }
`;

export function Clips(props) {
  const clips = useRecoilValue(clipsState);
  const selectedClipIds = useRecoilValue(selectedClipIdsState);
  const scroll = useRef(0);

  useEffect(() => {
    const onScroll = (e) => {
      // client JS hack to scroll first selected element back to view...
      const s = document.documentElement.scrollTop;
      if (s === 0 && scroll.current > 200) {
        function scrollToFirst() {
          const first = document.querySelector(".clip.selected");
          const firstTop = first.getBoundingClientRect().top;
          if (!first || !firstTop) return setTimeout(scrollToFirst, 50);
          const navHeight = document
            .getElementById("navigation")
            .getBoundingClientRect().height;
          document.documentElement.scrollTo({ top: firstTop - navHeight - 20 });
        }
        scrollToFirst();
      }
      scroll.current = s;
    };
    window.addEventListener("scroll", onScroll);
    return function cleanup() {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <ClipsContainer
      id={props.clipsContainerID}
      className={selectedClipIds.length ? "selection-present" : ""}
    >
      {clips.map((clip) => (
        <Clip {...clip} key={clip._id} clickable />
      ))}
    </ClipsContainer>
  );
}

export default Clips;
