import React, { Suspense } from "react";
import classNames from "classnames";

// Components
import Clips from "./Clips";
import { Loader } from "../../components";
import Selecto from "./Selecto";

export function SelectableClips(props) {
  const containerID = "selectable-container";
  return (
    <>
      <div id={containerID} className={classNames("no-select")}>
        <Suspense fallback={<Loader />}>
          <Clips />
        </Suspense>
      </div>
      <Selecto containerID={containerID} />
    </>
  );
}

export default SelectableClips;
