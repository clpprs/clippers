import classNames from "classnames";
import Tag from "./Components/Tag";

import { IconButton, Autocomplete, Box } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

function SearchBar(props) {
  return (
    <Autocomplete
      id="tag-search"
      options={props.tags}
      autoHighlight
      // getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Tag tag={option} />
        </Box>
      )}
      renderInput={(params) => (
        <div
          className={classNames(props.className, [
            "flex",
            "m-1",
            "h-8",
            "rounded",
            "bg-neutral-50",
            "items-center",
          ])}
          style={{ width: "17.3rem" }}
        >
          <div
            class="flex-1 pl-10 pr-2 h-full w-full"
            ref={params.InputProps.ref}
          >
            <input
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#00000000",
              }}
              placeholder="Search tags..."
              type="text"
              {...params.inputProps}
            />
          </div>
          <IconButton className="fixed-important p-1">
            <SearchSharpIcon color="#3a3a3a" />
          </IconButton>
        </div>
      )}
    />
  );
}

const tags = [
  "scenery",
  "bakemonogatari",
  "action",
  "dialogue",
  "still",
  "araragi kyomi",
  "araragi karen",
  "araragi tsukihi",
  "kanbaru suruga",
  "hanekawa tsubasa",
  "oshino meme",
  "oshino shinobu",
  "kiss-shot acerola-orion heart-under-blade",
  "oshino ougi",
  "yotsugi ononoki",
  "mayoi hachikuji",
];

export default function Sidebar(props) {
  return (
    <div>
      <SearchBar tags={tags} />
      <ul>
        {tags.map((tag) => {
          return (
            <li>
              <Tag tag={tag} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
