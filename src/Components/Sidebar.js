import React, { Suspense } from "react";

// Components
import Search from "./Search";
import { SelectedTag } from "./Tags";
import { Tag } from "./Tags/Tag";

// State
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clipTagsAtom, selectedTagsAtom } from "../state";
import Loader from "./Loader";
import classNames from "classnames";

import styled from "styled-components";

const StyledTag = styled.li`
  & .tag-button {
    opacity: 0;
    position: relative;
  }

  &:hover .tag-button {
    opacity: 1;
  }
`;

function TagList(props) {
  const clipTags = useRecoilValue(clipTagsAtom);
  const selectedTags = useRecoilValue(selectedTagsAtom);
  const setSelectedTags = useSetRecoilState(selectedTagsAtom);

  // Remove selected tags from the taglist
  const selectedTagNames = selectedTags.map((tag) => tag.name);
  const availableTags = clipTags.filter(
    (tag) => !selectedTagNames.includes(tag.name)
  );

  // TODO: figure out what this does
  // const toggleTag = (name, include) => {
  //   setSelectedTags((tags) => {
  //     const found = tags.findIndex((t) => t.name === name);
  //     if (found === -1) return [...tags, { name, include }];
  //     const newtags = tags.slice();
  //     newtags[found] = { name, include };
  //     return newtags;
  //   });
  // };

  return (
    <ul className="sidebar-taglist h-min overflow-y-auto px-2">
      {availableTags.length ? (
        availableTags.map(({ name, count }) => (
          <StyledTag key={name}>
            <Tag
              className={classNames("pl-2", "pb-1")}
              name={name}
              count={count}
              button
              add
            />
          </StyledTag>
        ))
      ) : (
        <>
          <li>These results contain no tags</li>
          <li>Please tag them!</li>
        </>
      )}
    </ul>
  );
}

const SelectedTagList = styled.div`
  & .included {
    background-color: var(--included-color);
  }
  & .excluded {
    background-color: var(--excluded-color);
  }
  & .selected span:hover {
    text-decoration: line-through;
  }
`;

function SelectedTags(props) {
  const selectedTags = useRecoilValue(selectedTagsAtom);
  if (!selectedTags.length) return null;

  return (
    <SelectedTagList
      id="selectedTags"
      className={classNames(
        "flex",
        "px-3",
        "gap-1",
        "my-1",
        "m-2",
        "h-min",
        "flex-wrap",
        "justify-items-start"
      )}
    >
      {selectedTags.map((tag) => (
        <Tag
          tag={tag}
          key={tag.name}
          className={classNames("w-full", "whitespace-pre-wrap")}
          button
          remove
        />
      ))}
    </SelectedTagList>
  );
}

function Sidebar(props) {
  return (
    <div id="sidebar" className={`sidebar flex flex-col ${props.className}`}>
      <Search />
      <SelectedTags />
      <Suspense fallback={<Loader />}>
        <TagList />
      </Suspense>
    </div>
  );
}

export default Sidebar;
