import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import classNames from "classnames";

function SelectedTag(props) {
  return (
    <div
      className={classNames([
        "inline-flex",
        "w-fit",
        "rounded-full",
        props.included ? "bg-blue-400" : "bg-red-400",
        "items-center",
      ])}
    >
      <span
        className={classNames([
          "h-fit",
          "py-1",
          "pl-2",
          "pr-1",
          "text-sm",
          "align-middle",
          "text-black",
        ])}
      >
        {props.tag}
      </span>
      <ClearOutlinedIcon className="mr-1 cursor-pointer" fontSize="18px" />
    </div>
  );
}

export default SelectedTag;
