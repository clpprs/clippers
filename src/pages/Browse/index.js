import React from "react";

// Components
import SelectableClips from "./SelectableClips";
import SidebarContent from "./SidebarContent";
import BrowseContent from "./ContentWrapper";
// Containers
import { Sidebar } from "../../components";

export function Browse(props) {
  return (
    <>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <BrowseContent id="browse">
        <SelectableClips />
      </BrowseContent>
    </>
  );
}

export default Browse;
