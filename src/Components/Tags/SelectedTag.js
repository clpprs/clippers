import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import classNames from "classnames";

function SelectedTag(props) {
  return (
    <div
      className={classNames([
        "selected-tag",
        "inline-flex",
        "w-fit",
        "h-fit",
        "rounded-full",
        props.included ? "bg-blue-400" : "bg-red-400",
        "items-center",
      ])}
      title={props.tag}
    >
      <p
        className={classNames([
          "pl-2",
          "my-0.5",
          "text-xs",
          "align-middle",
          "text-black",
        ])}
      >
        {props.tag}
      </p>
      <ClearOutlinedIcon
        className="mr-1 cursor-pointer"
        fontSize="14px"
        onClick={() => props.handleRemove()}
      />
    </div>
  );
}

export default SelectedTag;
