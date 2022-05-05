import { useState } from "react";

// MUI
import { IconButton, Autocomplete } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

// State
import { useRecoilValue } from "recoil";
import { allTagsAtom, selectedTagsAtom } from "../state";

// Custom components
import { Tag } from "./Tags/Tag";
import classNames from "classnames";

import styled from "styled-components";

const StyledAutocomplete = styled(Autocomplete)`
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  border: none;
`;

function Search(props) {
  // Recoil state
  const taglist = useRecoilValue(allTagsAtom);
  const selectedTags = useRecoilValue(selectedTagsAtom);
  const selectedTagnames = Array.isArray(selectedTags)
    ? selectedTags.map((t) => t.name)
    : [];

  // Component state
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <StyledAutocomplete
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
            className={classNames(
              [props.className],
              "mui-tag-container w-full"
            )}
            style={{ padding: "0rem 0.25rem" }}
          >
            <Tag name={option} key={option} add exclude className="w-full" />
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
