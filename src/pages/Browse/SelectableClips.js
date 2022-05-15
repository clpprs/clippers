import React, { Suspense } from "react";
import classNames from "classnames";
import styled from "styled-components";

// Components
import Clips from "./Clips";
import { Loader, ContextMenu } from "../../components";
import Selecto from "./Selecto";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export function SelectableClips(props) {
  const containerID = "selectable-container";

  return (
    <>
      <Container id={containerID} className={classNames("no-select")}>
        <Suspense fallback={<Loader />}>
          <Clips />
        </Suspense>
      </Container>
      <Selecto containerID={containerID} />
      <Suspense fallback={null}>
        <ContextMenu />
      </Suspense>
    </>
  );
}

export default SelectableClips;
