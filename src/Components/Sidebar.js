// Components
import Search from "./Search";
import { Tag, SelectedTag } from "./Tags";

// State
import { useRecoilValue } from "recoil";
import { clipTagsAtom, selectedTagsAtom } from "../recoil";

export default function Sidebar(props) {
  const clipTags = useRecoilValue(clipTagsAtom);
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
      <ul className="sidebar-taglist h-full overflow-y-auto px-2">
        {clipTags.map((name) => (
          <li key={name}>
            <Tag name={name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
