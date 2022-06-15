import { useState } from "react";

// MUI
import { IconButton, Autocomplete, Paper } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

// State
import { useRecoilValue } from "recoil";
import { allTagsState, selectedTagsState } from "../state";

// Custom components
import { Tag } from "./Tags";
import classNames from "classnames";

import styled from "styled-components";

const StyledAutocomplete = styled(Autocomplete)`
  background-color: var(--light-background) !important;
  outline: none;
  border: none;
  width: 100%;
  position: relative;
`;

const StyledInput = styled.input`
  background-color: inherit;
  outline: none;
  padding-left: 0.25rem;
  width: 100%;
  height: 100%;

  &::placeholder {
    color: var(--text-color) !important;
  }
`;

const StyledPaper = styled(Paper)`
  background-color: var(--header-background) !important;
  color: var(--tag-color) !important;
  border-radius: 0 !important;
  scrollbar-width: thin !important;
  scrollbar-color: var(--highlight) transparent !important;

  & .tag:hover {
    color: var(--highlight) !important;
  }
`;

const StyledList = styled.ul`
  display: flex !important;
  flex-flow: column nowrap !important;
  gap: 0.5rem !important;
  padding-left: 0.75rem !important;
`;

const StyledOption = styled.div``;

export function Search({ availableTags, onChange, ...props }) {
  // Recoil state
  const allTags = useRecoilValue(allTagsState);
  const taglist = availableTags || allTags;
  const selectedTags = useRecoilValue(selectedTagsState);
  const selectedTagnames = Array.isArray(selectedTags)
    ? selectedTags.map((t) => t.name)
    : [];

  // Component state
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={classNames(props.className)}>
      <StyledAutocomplete
        id="tag-search"
        autoHighlight
        options={taglist}
        value={value}
        inputValue={inputValue}
        renderOption={(props, option) =>
          !selectedTagnames.includes(option) && (
            <StyledOption {...props} className="mui-tag-container">
              <Tag
                name={option}
                key={option}
                add={!onChange}
                exclude={!onChange}
              />
            </StyledOption>
          )
        }
        renderInput={(params) => (
          <div
            className="flex h-8 w-full rounded pl-2 items-center"
            ref={params.InputProps.ref}
          >
            <StyledInput
              placeholder="Search tags..."
              type="text"
              {...params.inputProps}
            />
            <IconButton className={classNames("absolute", "p-1", "right-3")}>
              <SearchSharpIcon color="#3a3a3a" />
            </IconButton>
          </div>
        )}
        PaperComponent={StyledPaper}
        ListboxComponent={StyledList}
        onChange={(e, value) => {
          if (onChange) onChange(e, value);
          setValue(null);
          setInputValue(inputValue);
        }}
        onInputChange={(e, newInputValue) => {
          setInputValue(newInputValue.toLowerCase());
        }}
      />
    </div>
  );
}

export default Search;
