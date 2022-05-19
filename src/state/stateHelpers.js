/**
 *
 * @param {Array} tags Array of tag objects { name: String, include: Boolean }
 * @returns
 */
export const makeQuery = (tags) => {
  if (!Array.isArray(tags) || !tags.length) return {};

  const included = tags.filter((tag) => tag.include).map((tag) => tag.name);
  const excluded = tags.filter((tag) => !tag.include).map((tag) => tag.name);

  if (!included.length && !excluded.length) return {};
  if (included.length && excluded.length)
    return {
      $and: [{ tags: { $all: included } }, { tags: { $nin: excluded } }],
    };
  if (included.length) return { tags: { $all: included } };
  if (excluded.length) return { tags: { $nin: excluded } };

  return {};
};

export const getSharedTags = (clips) => {
  let shared = [];
  let notShared = [];

  for (const clip of clips) {
    for (const tag of clip.tags) {
      if (notShared.includes(tag) || shared.includes(tag)) continue;

      if (
        clips.reduce((isShared, c) => {
          if (!isShared) return isShared;
          if (c.tags.includes(tag)) return true;
          return false;
        }, true)
      ) {
        shared.push(tag);
      } else notShared.push(tag);
    }
  }

  return shared.filter((tag) => !notShared.includes(tag));
};
