import React from "react";
import classNames from "classnames";

// MUI
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// State
import { useSetRecoilState, useRecoilValue } from "recoil";
import { selectedTagsAtom } from "../../state";

function TagButton(props) {
  const setSelectedTags = useSetRecoilState(selectedTagsAtom);
  const selectedTags = useRecoilValue(selectedTagsAtom);

  const toggleTag = (name, include = null) => {
    setSelectedTags((tags) => {
      const found = tags.findIndex((t) => t.name === name);
      if (found === -1) return [...tags, { name, include }];
      const newtags = [...tags];
      newtags[found] = { name, include };
      return newtags;
    });
  };

  let { include, name, title } = {
    ...props,
  };

  const isIncluded = !!selectedTags?.find((tag) => tag?.name === name)?.include;

  include = include == null ? !isIncluded : include;

  if (!name && !props.onClick) {
    console.warn("<TagButton /> requires a name or an onClick handler");
    return null;
  }

  const {
    icon: Icon = include ? AddIcon : RemoveIcon,
    onClick = (e) => {
      e.stopPropagation();
      toggleTag(name, include);
    },
  } = { ...props };

  return (
    Icon && (
      <div
        title={title}
        className={classNames(
          props.className,
          "tag-button",
          "inline-flex",
          "rounded-full",
          "items-center",
          "cursor-pointer",
          "justify-center"
        )}
        onClick={onClick}
      >
        <Icon
          className={classNames([
            "tag-button-icon",
            include ? "include" : "exclude",
            "cursor-pointer",
          ])}
          fontSize="8px"
        />
      </div>
    )
  );
}

export default TagButton;
