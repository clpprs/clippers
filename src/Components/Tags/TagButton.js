import classNames from "classnames";

// MUI
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// State
import { useSetRecoilState } from "recoil";
import { selectedTagsAtom } from "../../state";

function TagButton(props) {
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

  // Overrideable variants
  function getVariant(variant) {
    switch (variant) {
      case "exclude": {
        return {
          color: "error",
          include: false,
        };
      }
      case "include": {
        return {
          color: "green",
          include: true,
        };
      }
      default:
        return {};
    }
  }

  const { include, color, name, title, className } = {
    ...getVariant(props.variant),
    ...props,
  };

  if (!name && !props.onClick) {
    console.warn("<TagButton /> requires a name or an onClick handler");
    return null;
  }

  const {
    icon: Icon = include ?? include ? AddIcon : RemoveIcon,
    onClick = (e) => {
      e.stopPropagation();
      toggleTag(name, include);
    },
  } = { ...props };

  // Only fires if <Tag button={{}}/> is missing an icon
  if (name && !Icon) {
    console.warn(
      "button needs a { variant: String } or { icon: Function } option to render"
    );
    return null;
  }

  // Only render if an icon is supplied
  return (
    Icon && (
      <div title={title} className={divClasses(className)} onClick={onClick}>
        <Icon
          className="tag-button-icon cursor-pointer"
          fontSize="8px"
          color={color}
        />
      </div>
    )
  );
}

function divClasses(className) {
  return classNames(
    className,
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
  );
}

export default TagButton;
