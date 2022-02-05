import { useState } from "react";

// MUI
import { IconButton, Autocomplete } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

// State
import { useRecoilValue, useSetRecoilState } from "recoil";
import { allTagsAtom, selectedTagsAtom } from "../state";

// Custom components
import { Tag } from "./Tags";
import classNames from "classnames";

function Search(props) {
  // Recoil state
  const taglist = useRecoilValue(allTagsAtom);
  const selectedTags = useRecoilValue(selectedTagsAtom);
  const selectedTagnames = selectedTags.map((t) => t.name);
  const setSelectedTags = useSetRecoilState(selectedTagsAtom);

  // Component state
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // Tag click handler
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
    <Autocomplete
      id="tag-search"
      autoHighlight
      className="box-border p-3 w-full relative"
      options={taglist}
      value={value}
      inputValue={inputValue}
      renderOption={(props, option) =>
        !selectedTagnames.includes(option) && (
          <li
            {...props}
            className={classNames([props.className], "mui-tag-container")}
            style={{ padding: "0rem 0.25rem" }}
          >
            <Tag
              name={option}
              key={option}
              button="decline"
              onClick={() => toggleTag(option, true)}
            />
          </li>
        )
      }
      renderInput={(params) => (
        <div
          className="flex h-8 w-full rounded pl-2 bg-neutral-50 items-center"
          ref={params.InputProps.ref}
        >
          <input
            className="w-full h-full pl-1"
            placeholder="Search tags..."
            type="text"
            {...params.inputProps}
          />
          <IconButton className="absolute p-1 right-3">
            <SearchSharpIcon color="#3a3a3a" />
          </IconButton>
        </div>
      )}
      onChange={(e, value) => {
        setValue(null);
        setInputValue(inputValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue.toLowerCase());
      }}
    />
  );
}

export default Search;
