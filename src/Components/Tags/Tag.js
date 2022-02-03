import classNames from "classnames";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// State
import { useSetRecoilState } from "recoil";
import { selectedTags } from "../../recoil";

function Button(props) {
  return (
    <div
      className={classNames(
        props.className,
        "inline-flex",
        "w-5",
        "h-5",
        "rounded-full",
        props.add ? "bg-cyan-500" : "bg-red-500",
        "bg-opacity-0",
        "hover:bg-opacity-50",
        "justify-center",
        "items-center"
      )}
      onClick={(event) => {
        event.stopPropagation();
        props.handleClick();
      }}
    >
      {props.add ? (
        <AddIcon
          className="p-0 cursor-pointer"
          fontSize="16px"
          sx={{ color: "#2979ff" }}
        />
      ) : (
        <RemoveIcon className="p-0 cursor-pointer" fontSize="16px" />
      )}
    </div>
  );
}

export default function Tag(props) {
  const setTags = useSetRecoilState(selectedTags);

  const handleClick = (tag, include = false) => {
    setTags((tags) => {
      let found = tags.findIndex((tagL) => tagL.tag === tag);
      if (found === -1) {
        return [...tags, { tag: props.tag, include: include }];
      } else {
        const newtags = tags.slice();
        newtags[found] = { tag: tag, include: include };
        return newtags;
      }
    });
  };

  return (
    <div
      className={classNames("flex", "w-full", "p-2", "items-center")}
      onClick={(event) => {
        event.stopPropagation();
        handleClick(props.tag, true);
      }}
    >
      <span className="flex-1 align-middle text-sm cursor-pointer">
        {props.tag}
      </span>
      <Button
        tag={props.tag}
        add
        handleClick={() => handleClick(props.tag, true)}
      />
      <Button tag={props.tag} handleClick={() => handleClick(props.tag)} />
    </div>
  );
}
