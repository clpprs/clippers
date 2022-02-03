import Tag from "./Tag";
import Search from "./Search";
import SelectedTag from "./SelectedTag";

import { useSetRecoilState, useRecoilValue } from "recoil";
import { clipTags, selectedTags, excludedTags } from "../recoil";

export default function Sidebar(props) {
  const tags = useRecoilValue(clipTags);
  const includes = useRecoilValue(selectedTags);
  const excludes = useRecoilValue(excludedTags);

  const setInclude = useSetRecoilState(selectedTags);
  const setExclude = useSetRecoilState(excludedTags);

  const handleRemove = (tag, included = false) => {
    if (included) {
      setInclude((tags) => tags.filter((tagL) => tagL !== tag));
    } else {
      setExclude((tags) => tags.filter((tagL) => tagL !== tag));
    }
  };
  return (
    <div className={`sidebar ${props.className}`}>
      <Search />
      <div className="flex m-2 w-full flex-wrap justify-items-start gap-1">
        {includes.map((tag) => {
          return (
            <SelectedTag
              tag={tag}
              included
              handleRemove={() => handleRemove(tag, true)}
            />
          );
        })}
        {excludes.map((tag) => {
          return (
            <SelectedTag tag={tag} handleRemove={() => handleRemove(tag)} />
          );
        })}
      </div>
      <ul className="sidebar-taglist">
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
