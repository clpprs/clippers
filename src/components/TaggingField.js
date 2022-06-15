import React from "react";
import classNames from "classnames";
import styled from "styled-components";

// Components
import { IconButton, Autocomplete, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

// State
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import {
  allTagsState,
  selectedClipIdsState,
  selectedClipsState,
  sharedTagsAtom,
  clipsQuery,
} from "../state";

// API
import axios from "axios";
import { url } from "../config";

const Container = styled.div`
  width: 100%;
  & #tag-field {
    width: 100%;
    order: -1;
  }
`;

const StyledAutocomplete = styled(Autocomplete)`
  background-color: var(--card-background);
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
`;

const StyledPaper = styled(Paper)`
  background-color: #0d1321 !important;
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

  & .list-option:hover {
    color: var(--highlight);
  }
`;

export function TaggingField(props) {
  // Recoil state
  const selectedClipIds = useRecoilValue(selectedClipIdsState);
  const allTags = useRecoilValue(allTagsState);
  const sharedTags = useRecoilValue(sharedTagsAtom);

  // UNSTABLE lol
  const refreshSelectedClips = useRecoilRefresher_UNSTABLE(selectedClipsState);
  const refreshClipsQuery = useRecoilRefresher_UNSTABLE(clipsQuery);

  const { fallback } = props;

  // Guards
  if (!selectedClipIds.length)
    return <>{fallback || <p>Hint: select clips by shift clicking</p>}</>;

  // Component state
  const availableTags = selectedClipIds.length
    ? allTags.filter((tag) => !sharedTags.includes(tag))
    : [];

  const handleAddTag = (tag) => {
    // console.log("Adding tag", tag);
    axios
      .patch(url("api", "clip"), {
        patch: { _id: selectedClipIds, tags: { add: [tag] } },
      })
      .then((data) => {
        refreshSelectedClips();
        refreshClipsQuery();
      });
  };
  const handleRemoveTag = (tag) => {
    // console.log("Removing tag", tag);
    axios
      .patch(url("api", "clip"), {
        patch: { _id: selectedClipIds, tags: { remove: [tag] } },
      })
      .then((data) => {
        refreshSelectedClips();
        refreshClipsQuery();
      });
  };

  return (
    <Container className={classNames(props.className, "tagfield-container")}>
      <StyledAutocomplete
        id="tag-field"
        multiple
        disableCloseOnSelect
        className={classNames("w-full")}
        options={allTags}
        value={sharedTags}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classNames()}
            variant="outlined"
            placeholder="Add tags..."
          />
        )}
        renderOption={(props, option, { selected }) =>
          availableTags.includes(option) && (
            <li
              {...props}
              className="list-option"
              onClick={(e) => {
                if (!selected) handleAddTag(option);
                else handleRemoveTag(option);
                props.onClick(e);
              }}
            >
              {option}
            </li>
          )
        }
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const tagProps = getTagProps({ index });
            return (
              <Chip
                label={option}
                {...tagProps}
                onDelete={() => {
                  handleRemoveTag(option);
                  tagProps.onDelete();
                }}
              />
            );
          })
        }
        PaperComponent={StyledPaper}
        ListboxComponent={StyledList}
      />
    </Container>
  );
}

export default TaggingField;
