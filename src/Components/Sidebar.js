import React, { Suspense } from "react";

// Components
import Search from "./Search";
import { Tag, SelectedTag } from "./Tags";

// State
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clipTagsAtom, selectedTagsAtom } from "../recoil";

function TagList(props) {
  const clipTags = useRecoilValue(clipTagsAtom);

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
    <ul className="sidebar-taglist h-full overflow-y-auto px-2">
      {clipTags.map(({ name, count }) => (
        <li key={name}>
          <Tag
            name={name}
            count={count}
            onClick={() => toggleTag(name, true)}
            button="exclude"
          />
        </li>
      ))}
    </ul>
  );
}

function Sidebar(props) {
  const selectedTags = useRecoilValue(selectedTagsAtom);

  return (
    <div className={`sidebar flex flex-col ${props.className}`}>
      <>
        <Search />
        <div className="flex m-2 max-w-full flex-wrap justify-items-start gap-1">
          {selectedTags.map((tag) => (
            <SelectedTag tag={tag} key={tag.name} />
          ))}
        </div>
      </>
      <Suspense fallback={<p>loading...</p>}>
        <TagList />
      </Suspense>
    </div>
  );
}

export default Sidebar;
