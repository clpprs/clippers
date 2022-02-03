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
      <text
        className={classNames([
          "h-fit",
          "pl-2",
          "py-0.5",
          "text-xs",
          "align-middle",
          "text-black",
        ])}
      >
        {props.tag}
      </text>
      <ClearOutlinedIcon
        className="mr-1 cursor-pointer"
        fontSize="14px"
        onClick={() => props.handleRemove()}
      />
    </div>
  );
}

export default SelectedTag;
