import React from "react";
import classNames from "classnames";

// Components
import TagButton from "./TagButton";
import { selectedTagsState } from "../../state";
import { useRecoilState } from "recoil";

/**
 * Tag element. You can supply the tag params through props.tag or as separate props
 *
 * If `add` or `toggle` or `remove` is present a default onClick
 * handler will be used, this can be overridden with props.onClick
 * or stopped by not providing those props
 *
 * @param {Object} props
 * @param {String} props.name name of the tag
 * @param {Number} props.count how many times tag is found in query results
 * @param {Function} props.onClick function to run when tag text is clicked
 *
 * @param {Boolean} props.add if true, will add the tag from the query onClick
 * @param {Boolean} props.remove if true, will remove the tag from the query onClick
 * @param {Boolean} props.toggle if true, will toggle the tag in the query onClick
 *
 * @param {Boolean} props.include if true, will render an include <TagButton />
 * @param {Bollean} props.exclude if true, will render an exclude <TagButton />
 * @param {Boolean | Object} props.button if an object, will pass those props to the <TagButton />.
 * If true and add or toggle is also true, will render an inverted <TagButton />.
 * If false, will not render a <TagButton />
 *
 * @example Pass tag information as an object
 * ```js
 * <Tag tag={{name: "bakemonogatari", count: 9188}} />
 * ```
 *
 * @example Pass tag information as props
 * ```js
 * <Tag name="bakemonogatari" count={9188} />
 * ```
 *
 * @example Render an including <TagButton />
 * ```js
 * <Tag tag={tag} include />
 * ```
 *
 * @example Render a sidebar tag
 * ```js
 * <Tag tag={tag} add button />
 * ```
 *
 */
export function Tag(props) {
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

  const { include, exclude } = props;
  let { tag, name, count, add, remove, toggle, button } = {
    ...props.tag,
    ...props,
  };

  name = typeof tag === "string" ? tag : name;

  const thisTag = selectedTags?.find?.((tag) => tag?.name === name);
  const isSelected = !!thisTag;
  const isIncluded = thisTag?.include;

  const removeTag = (name) =>
    setSelectedTags((tags) => tags.filter((t) => t.name !== name));

  const addTag = (tag) =>
    !isSelected && setSelectedTags((tags) => [...tags, { ...tag }]);

  const toggleTag = (name, include = true) => {
    setSelectedTags((tags) =>
        tags.map((tag) => (tag.name === name ? { ...tag, include } : tag))
    );
  };

  const setSelectedTag = ({ name, include = true, remove = false }) => {
    if (remove) removeTag(name);
    addTag({ name, include });
    toggleTag(name, include);
  };

  // could clean up in a function
  button = (() => {
    if (!button) return false;
    if (typeof button === "object") return { name, ...button };
    if (exclude || toggle) return { name, include: false };
    if (include) return { name, include: true };
    if (!toggle) return { name };
    return false;
  })();

  // could clean up in a function
  const onClick =
    props.onClick || add
      ? () => setSelectedTag({ name })
      : remove
      ? () => setSelectedTag({ name, remove: true })
      : toggle
      ? () =>
          setSelectedTag({
            name,
            remove: isSelected,
          })
      : undefined;

  return (
    <div
      className={classNames(
        props.className,
        "tag",
        "flex",
        "justify-between",
        isSelected && "selected",
        isIncluded != null && isIncluded && "included",
        isIncluded != null && !isIncluded && "excluded",
        button && "has-button",
        onClick && "has-action",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <span className="tag-name">
        {`${name}${!Number.parseInt(count) ? "" : ` (${count})`}`}
      </span>
      {button && <TagButton {...button} />}
    </div>
  );
}

export function Testing(props) {
  return (
    <>
      <div style={{ width: "30%", float: "left" }}>
        {/* Working */}
        <Tag name="bakemonogatari" button />
        <Tag name="araragi koyomi" button={{ include: false }} />
        <Tag name="araragi karen" button={{ include: true }} />
        <Tag name="text" add button={false} />
        <Tag name="card" add exclude />
        <Tag name="card" remove include />
        <Tag name="card" toggle include />
        <Tag name="still" toggle button />
      </div>
    </>
  );
}

export default Tag;
