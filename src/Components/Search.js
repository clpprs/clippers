import { useState } from "react";

// MUI
import { IconButton, Autocomplete, Box } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

// State
import { useSetRecoilState, useRecoilValue } from "recoil";
import { selectedTags, allTags } from "../recoil";

// Custom components
import Tag from "./Tag";

function Search(props) {
  const setTags = useSetRecoilState(selectedTags);
  const taglist = useRecoilValue(allTags);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <Autocomplete
      id="tag-search"
      autoHighlight
      className="box-border p-1 w-full"
      options={taglist}
      value={value}
      inputValue={inputValue}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Tag tag={option} key={option} />
        </Box>
      )}
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
          <IconButton className="absolute p-1">
            <SearchSharpIcon color="#3a3a3a" />
          </IconButton>
        </div>
      )}
      onChange={(e, value) => {
        setTags((tags) =>
          tags.includes(value)
            ? tags.filter((tag) => tag !== value)
            : [...tags, value]
        );
        setValue(null);
        setInputValue("");
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
    />
  );
}

export default Search;
