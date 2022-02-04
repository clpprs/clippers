import classNames from "classnames";

// Components
import TagButton from "./TagButton";

// State
import { useSetRecoilState } from "recoil";
import { selectedTagsAtom } from "../../recoil";

export default function Tag(props) {
  const { name } = props;

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
    <div
      className={classNames(
        "flex",
        "tag-container",
        "w-full",
        "px-2",
        "py-1",
        "justify-between",
        "items-center",
        "rounded-full",
        "cursor-pointer"
      )}
      onClick={() => toggleTag(name, true)}
    >
      <span className="tag-name align-middle text-sm cursor-pointer">
        {name}
      </span>
      <TagButton name={name} include={false} minusColor="error" />
    </div>
  );
}
