import React from "react";
import classNames from "classnames";
import styled from "styled-components";

// Components
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

// State
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import {
  allTagsAtom,
  selectedClipIdsAtom,
  selectedClipsAtom,
  sharedTagsAtom,
} from "../state";

// API
import axios from "axios";
import { url } from "../config";

const Container = styled.div`
  & #tag-field {
    width: 100%;
    order: -1;
  }
`;

export function TaggingField(props) {
  // Recoil state
  const selectedClipIds = useRecoilValue(selectedClipIdsAtom);
  const allTags = useRecoilValue(allTagsAtom);
  const sharedTags = useRecoilValue(sharedTagsAtom);

  // UNSTABLE lol
  const refreshSelectedClips = useRecoilRefresher_UNSTABLE(selectedClipsAtom);

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
      .then((data) => refreshSelectedClips());
  };
  const handleRemoveTag = (tag) => {
    // console.log("Removing tag", tag);
    axios
      .patch(url("api", "clip"), {
        patch: { _id: selectedClipIds, tags: { remove: [tag] } },
      })
      .then((data) => refreshSelectedClips());
  };

  return (
    <Container
      className={classNames(props.className, "tagfield-container", "w-full")}
    >
      <Autocomplete
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
        renderOption={(props, option, { selected }) => (
          <li
            {...props}
            style={{
              display: availableTags.includes(option) ? "block" : "none",
            }}
            onClick={(e) => {
              // console.log(option, selected);
              if (!selected) handleAddTag(option);
              else handleRemoveTag(option);
              props.onClick(e);
            }}
          >
            {option}
          </li>
        )}
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
      />
    </Container>
  );
}

export default TaggingField;
