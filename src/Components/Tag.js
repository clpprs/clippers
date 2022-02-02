import classNames from "classnames";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Button(props) {
  return (
    <div
      className={classNames(
        props.className,
        "inline-flex",
        "w-5",
        "h-5",
        "rounded-full",
        "bg-cyan-600",
        "bg-opacity-0",
        "hover:bg-opacity-50",
        "justify-center",
        "items-center"
      )}
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
  return (
    <div className={classNames("flex", "w-full", "p-2", "items-center")}>
      <text className="flex-1 align-middle text-sm">{props.tag}</text>
      <Button add />
      <Button />
    </div>
  );
}
