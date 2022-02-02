import Tag from "./components/Tag";

import { IconButton, Autocomplete, Box } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

import tagslist from "./tags";
import { useSetRecoilState } from "recoil";

// tags atom
import { tags } from "./recoil";
import { useState } from "react";

function SearchBar(props) {
  const setTags = useSetRecoilState(tags);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <Autocomplete
      id="tag-search"
      autoHighlight
      className="box-border p-1 w-full"
      options={props.tags}
      value={value}
      inputValue={inputValue}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Tag tag={option} key={option} />
        </Box>
      )}
      renderInput={(params) => (
        <div
          className="flex h-8 rounded pl-2 bg-neutral-50 items-center"
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

export default function Sidebar(props) {
  return (
    <div className={`sidebar ${props.className}`}>
      <SearchBar tags={tagslist} />
      <ul className="sidebar-taglist">
        {tagslist.map((tag) => {
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
