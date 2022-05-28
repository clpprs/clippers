import React from "react";

// Components
import SelectableClips from "./SelectableClips";
import SidebarContent from "./SidebarContent";
import BrowseContent from "./ContentWrapper";

// Containers
import { Sidebar } from "../../components";
import { useSearchParams } from "react-router-dom";

export function Browse(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("tags"));

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
