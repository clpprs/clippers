import { useState } from "react";

// MUI
import { IconButton, Autocomplete, Box } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

// State
import { useRecoilValue } from "recoil";
import { allTagsAtom } from "../recoil";

// Custom components
import { Tag } from "./Tags";

function Search(props) {
  const taglist = useRecoilValue(allTagsAtom);
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
          <Tag name={option} key={option} button="decline" />
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
