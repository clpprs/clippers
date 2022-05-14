import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";

// Components
import Clips from "./Clips";
import ContextMenu from "../../components/ContextMenu";
import Selecto from "react-selecto";

// State
import { selectedClipIdsAtom } from "../../state";
import { useSetRecoilState, useRecoilValue } from "recoil";

import KeyController from "keycon";
import classNames from "classnames";
import Sidebar from "../../components/Sidebar";
import { Loader } from "../../components";

const keycon = new KeyController();

function SelectableClips(props) {
  const setSelectedClipIds = useSetRecoilState(selectedClipIdsAtom);
  const selectedClipIds = useRecoilValue(selectedClipIdsAtom);

  const [shiftDown, setShiftDown] = useState(false);

  // Set the event listeners once
  useEffect(() => {
    keycon.keydown("shift", (e) => {
      setShiftDown(true);
    });
    keycon.keyup("shift", (e) => {
      setShiftDown(false);
    });
  }, [true]);

  return (
    <>
      <div id="selectable-container" className={classNames("no-select")}>
        <Clips />
      </div>
      <Selecto
        container={"#selectable-container"}
        dragContainer={"#selectable-container"}
        selectableTargets={[".clip"]}
        selectByClick={shiftDown}
        selectFromInside={true}
        continueSelect={false}
        toggleContinueSelect={"shift"}
        keyContainer={window}
        hitRate={5}
        onSelect={(e) => {
          let a = [];
          let r = [];
          e.added.forEach((el) => {
            el.classList.add("selected");
            a.push(el.id);
          });
          e.removed.forEach((el) => {
            el.classList.remove("selected");
            r.push(el.id);
          });
          setSelectedClipIds((clips) =>
            [...clips, ...a].filter((c) => !r.includes(c))
          );
        }}
      />
    </>
  );
}

const Content = styled.div`
  overflow-y: scroll;

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
      <Suspense fallback={<Loader />}>
        <Content>
          <SelectableClips />
          <Suspense fallback={null}>
            <ContextMenu />
          </Suspense>
        </Content>
      </Suspense>
    </>
  );
}

export default Browse;
