import classNames from "classnames";
import TagButton from "./TagButton";

export default function Tag(props) {
  const { name, count, onClick, button } = props;

  return (
    <div
      className={classNames(
        "flex",
        "tag-container",
        "w-full",
        "px-2",
        "py-1",
        "justify-between",
        "items-center",
        "rounded-full",
        "cursor-pointer"
      )}
      onClick={onClick}
    >
      <span className="tag-name align-middle text-sm cursor-pointer">
        {`${name}${!Number.parseInt(count) ? "" : ` (${count})`}`}
      </span>
      {button && typeof button === "string" ? (
        <TagButton variant={button} name={name} />
      ) : typeof button === "object" ? (
        <TagButton {...button} name={name} />
      ) : null}
    </div>
  );
}
