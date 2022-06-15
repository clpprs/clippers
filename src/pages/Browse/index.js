import React, { Suspense } from "react";

// Components
import SelectableClips from "./SelectableClips";
import SidebarContent from "./SidebarContent";
import BrowseContent from "./ContentWrapper";

// Containers
import { Sidebar } from "../../components";

export function Browse(props) {
  const clipsContainerID = "clips-container";
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
