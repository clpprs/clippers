import Search from "./Search";
import { Tag, SelectedTag } from "./Tags";

import { useSetRecoilState, useRecoilValue } from "recoil";
import { clipTags, selectedTags } from "../recoil";

export default function Sidebar(props) {
  const tags = useRecoilValue(clipTags);
  const selected = useRecoilValue(selectedTags);

  const setTags = useSetRecoilState(selectedTags);

  const handleRemove = (tag) => {
    setTags((tags) => tags.filter((tagL) => tagL.tag !== tag));
  };

  return (
    <div className={`sidebar flex flex-col ${props.className}`}>
      <Search />
      <div className="flex m-2 max-w-full flex-wrap justify-items-start gap-1">
        {selected.map((tag) => {
          return (
            <SelectedTag
              tag={tag.tag}
              included={tag.include}
              handleRemove={() => handleRemove(tag.tag)}
            />
          );
        })}
      </div>
      <ul className="sidebar-taglist max-h-full overflow-y-auto">
        {tags.map((tag) => {
          return (
            <li key={tag}>
              <Tag tag={tag} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
