import classNames from "classnames";

// MUI
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// State
import { useSetRecoilState } from "recoil";
import { selectedTagsAtom } from "../../recoil";

function TagButton(props) {
  let { name, include, title } = props;

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
      title={title}
      className={classNames(
        props.className,
        "tag-button",
        "bg-white",
        "inline-flex",
        "w-3",
        "h-3",
        "mx-1",
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
        <AddIcon className="tag-button-icon cursor-pointer" fontSize="8px" />
      ) : (
        <RemoveIcon
          className="tag-button-icon cursor-pointer"
          color={props.minusColor}
          fontSize="8px"
        />
      )}
    </div>
  );
}

export default TagButton;
