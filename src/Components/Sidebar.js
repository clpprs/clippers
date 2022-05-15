import React, { Suspense } from "react";
import styled from "styled-components";

// Components
import Search from "./Search";
import { Tag } from "./Tags/Tag";

// State
import { useRecoilValue } from "recoil";
import { clipTagsAtom, selectedTagsAtom } from "../state";
import classNames from "classnames";

const Subtitle = styled.span`
  width: 100%;
  font-size: 0.75rem;
  margin-bottom: -0.25rem;
`;

const SelectedTagList = styled.div`
  padding: 0 0.5rem;
  display: flex;
  flex-flow: row wrap;
  gap: 0.25rem;

  & .tag {
    padding: 0 0.25rem;
    white-space: pre-wrap;
  }

  & .tag .tag-button {
    padding-left: 0.25rem;
  }
`;

function SelectedTags(props) {
  const selectedTags = useRecoilValue(selectedTagsAtom);

  const [excluded, included] = selectedTags.reduce(
    (output, tag) => {
      output[Number(tag.include)].push(tag);
      return output;
    },
    [[], []]
  );

  return (
    !!selectedTags.length && (
      <SelectedTagList id="selected-tags" className="highlight-tags">
        {!!included.length && (
          <>
            <Subtitle>Included tags</Subtitle>
            {included.map((tag) => (
              <Tag tag={tag} key={tag.name} button remove />
            ))}
          </>
        )}

        {!!excluded.length && (
          <>
            <Subtitle className={classNames("mt-2")}>Excluded tags</Subtitle>
            {excluded.map((tag) => (
              <Tag tag={tag} key={tag.name} button remove />
            ))}
          </>
        )}
      </SelectedTagList>
    )
  );
}

const AvailableTags = styled.div`
  padding: 0 0.5rem;
`;

const AvailableTagList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.25rem;

  & .tag .tag-button {
    opacity: 0;
  }
  & .tag:hover .tag-button {
    opacity: 1;
  }
`;

function TagList(props) {
  const clipTags = useRecoilValue(clipTagsAtom);
  const selectedTags = useRecoilValue(selectedTagsAtom);

  // Remove selected tags from the taglist
  const selectedTagNames = selectedTags.map((tag) => tag.name);
  const availableTags = clipTags.filter(
    (tag) => !selectedTagNames.includes(tag.name)
  );

  return (
    <AvailableTags>
      <Subtitle>Most common tags</Subtitle>
      {availableTags.length ? (
        <AvailableTagList
          id="available-tags"
          className={classNames("sidebar-taglist")}
        >
          {availableTags.map(({ name, count }) => (
            <Tag name={name} key={name} count={count} button add />
          ))}
        </AvailableTagList>
      ) : (
        !clipTags.length && (
          <span>These results contain no tags. Please tag them!</span>
        )
      )}
    </AvailableTags>
  );
}

const SidebarContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 18rem;
  padding: 0.5rem;
  gap: 0.5rem;
`;

export function Sidebar(props) {
  return (
    <SidebarContainer id="sidebar" className={classNames("sidebar")}>
      <Search />
      <SelectedTags />
      <Suspense fallback={null}>
        <TagList />
      </Suspense>
    </SidebarContainer>
  );
}

export default Sidebar;
