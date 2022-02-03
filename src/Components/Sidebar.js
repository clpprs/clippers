import Tag from "./Tag";
import Search from "./Search";

import { useRecoilValue } from "recoil";
import { clipTags } from "../recoil";

export default function Sidebar(props) {
  const tags = useRecoilValue(clipTags);

  return (
    <div className={`sidebar ${props.className}`}>
      <Search />
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
