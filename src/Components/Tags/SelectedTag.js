import classNames from "classnames";

// Components
import TagButton from "./TagButton";

// State
import { useSetRecoilState } from "recoil";
import { selectedTagsAtom } from "../../state";

function SelectedTag(props) {
  const { tag } = props;

  const setSelectedTags = useSetRecoilState(selectedTagsAtom);
  const removeTag = (name) =>
    setSelectedTags((tags) => tags.filter((t) => t.name !== name));

  return (
    <div
      className={classNames([
        "selected-tag",
        tag.include ? "included-tag" : "excluded-tag",
        tag.include ? "bg-blue-400" : "bg-red-400",
        "inline-flex",
        "w-fit",
        "h-fit",
        "rounded-full",
        "items-center",
      ])}
    >
      <p
        title={tag.name}
        className={classNames([
          "pl-2",
          "my-0.5",
          "text-xs",
          "align-middle",
          "text-black",
          "cursor-pointer",
        ])}
        onClick={(e) => {
          e.stopPropagation();
          removeTag(tag.name);
        }}
      >
        {tag.name}
      </p>
      <TagButton
        title={(tag.include ? "exclude:" : "include:") + tag.name}
        name={tag.name}
        include={!tag.include}
      />
    </div>
  );
}

export default SelectedTag;
