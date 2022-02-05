import React, { Suspense } from "react";

// Components
import Search from "./Search";
import { Tag, SelectedTag } from "./Tags";

// State
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clipTagsAtom, selectedTagsAtom } from "../state";
import Loader from "./Loader";

function TagList(props) {
  const clipTags = useRecoilValue(clipTagsAtom);
  const selectedTags = useRecoilValue(selectedTagsAtom);

  // Remove selected tags from the taglist
  const selectedTagNames = selectedTags.map((tag) => tag.name);
  const availableTags = clipTags.filter(
    (tag) => !selectedTagNames.includes(tag.name)
  );

  const setSelectedTags = useSetRecoilState(selectedTagsAtom);

  const toggleTag = (name, include) => {
    setSelectedTags((tags) => {
      const found = tags.findIndex((t) => t.name === name);
      if (found === -1) return [...tags, { name, include }];
      const newtags = tags.slice();
      newtags[found] = { name, include };
      return newtags;
    });
  };

  return (
    <ul className="sidebar-taglist h-min overflow-y-auto px-2">
      {availableTags.length ? (
        availableTags.map(({ name, count }) => (
          <li key={name}>
            <Tag
              name={name}
              count={count}
              onClick={() => toggleTag(name, true)}
              button="exclude"
            />
          </li>
        ))
      ) : (
        <>
          <li>Results contain no tags</li>
          <li>Please tag them!</li>
        </>
      )}
    </ul>
  );
}

function SelectedTags(props) {
  const selectedTags = useRecoilValue(selectedTagsAtom);
  if (!selectedTags.length) return null;
  return (
    <div className="flex m-2 h-min flex-wrap justify-items-start gap-1">
      {selectedTags.map((tag) => (
        <SelectedTag tag={tag} key={tag.name} />
      ))}
    </div>
  );
}

function Sidebar(props) {
  return (
    <div
      id="sidebar-container"
      className={`sidebar flex flex-col ${props.className}`}
    >
      <Search />
      <SelectedTags />
      <Suspense fallback={<Loader />}>
        <TagList />
      </Suspense>
    </div>
  );
}

export default Sidebar;
