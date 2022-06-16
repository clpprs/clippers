import React, { Suspense, useEffect } from "react";

// Components
import SelectableClips from "./SelectableClips";
import SidebarContent from "./SidebarContent";
import BrowseContent from "./ContentWrapper";

// Containers
import { Sidebar } from "../../components";
import setTitle from "../../helpers/setTitle";

export function Browse(props) {
  const clipsContainerID = "clips-container";

  useEffect(() => {
    setTitle("Browse");
  }, []);

  return (
    <>
      <Sidebar>
        <Suspense fallback={null}>
          <SidebarContent clipsContainerID={clipsContainerID} />
        </Suspense>
      </Sidebar>
      <BrowseContent id="browse">
        <SelectableClips clipsContainerID={clipsContainerID} />
      </BrowseContent>
    </>
  );
}

export default Browse;
