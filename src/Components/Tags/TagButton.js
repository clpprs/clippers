import classNames from "classnames";

// MUI
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// State
import { useSetRecoilState } from "recoil";
import { selectedTagsAtom } from "../../recoil";

function TagButton(props) {
  let { name, include } = props;

  const setSelectedTags = useSetRecoilState(selectedTagsAtom);

  const toggleTag = (name, include) => {
    setSelectedTags((tags) => {
      const found = tags.findIndex((t) => t.name === name);
      if (found === -1) return [...tags, { name, include }];
      // console.log(`toggling ${name}: ${include}`);
      let newtags = [...tags];
      newtags[found] = { name, include };
      return newtags;
    });
  };

  return (
    <div
      className={classNames(
        props.className,
        "tag-button",
        "bg-white",
        "inline-flex",
        "w-5",
        "h-5",
        "rounded-full",
        "bg-opacity-0",
        "hover:bg-opacity-50",
        "justify-center",
        "items-center",
        "cursor-pointer"
      )}
      onClick={(e) => {
        e.stopPropagation();
        toggleTag(name, include);
      }}
    >
      {include ? (
        <AddIcon className="p-0 cursor-pointer" fontSize="16px" />
      ) : (
        <RemoveIcon className="p-0 cursor-pointer" fontSize="16px" />
      )}
    </div>
  );
}

export default TagButton;
