import React, { useState } from "react";

// Components
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

// State
import { useRecoilValue } from "recoil";
import { allTagsAtom, selectedClipIdsAtom, sharedTagsAtom } from "../../recoil";

// API
import axios from "axios";
import { url } from "../../config";

function TaggingField(props) {
  // Recoil state
  const allTags = useRecoilValue(allTagsAtom);
  const sharedTags = useRecoilValue(sharedTagsAtom);
  const selectedClipIds = useRecoilValue(selectedClipIdsAtom);

  console.log(sharedTags);

  // Component state
  const availableTags = selectedClipIds.length
    ? allTags.filter((tag) => !sharedTags.includes(tag))
    : [];

  const handleAddTag = (tag) => {
    axios
      .patch(url("api", "clip"), {
        patch: { _id: selectedClipIds, tags: { add: [tag] } },
      })
      .then((data) => console.log(data));
  };
  const handleRemoveTag = (tag) => {
    axios
      .patch(url("api", "clip"), {
        patch: { _id: selectedClipIds, tags: { remove: [tag] } },
      })
      .then((data) => console.log(data));
  };

  return (
    <Autocomplete
      id="tag-field"
      multiple
      disableCloseOnSelect
      options={availableTags}
      value={sharedTags}
      renderInput={(params) => (
        <TextField {...params} variant="standard" placeholder="Add tags..." />
      )}
      renderOption={(props, option, { selected }) => (
        <li
          {...props}
          onClick={(e) => {
            console.log(option, selected);
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
  );
}

export default TaggingField;
