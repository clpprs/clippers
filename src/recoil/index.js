import axios from "axios";
import { atom, selector } from "recoil";
import { url } from "../config";

import placeholdertaglist from "../tags";

/**
 * All available tags
 */
const allTagsAtom = atom({
  key: "allTags",
  default: placeholdertaglist,
});

/**
 * List of tags found in the current clips
 */
const clipTagsAtom = atom({
  key: "clipTags",
  default: placeholdertaglist,
});

/**
 * List of selected tag objects `{ name: "tagName", selected: Boolean }`
 */
const selectedTagsAtom = atom({
  key: "selectedTags",
  default: [],
});

/**
 *
 * @param {Array} tags Array of tag objects { name: String, selected: Boolean }
 * @returns
 */
const makeQuery = (tags) => {
  const included = tags.filter((tag) => tag.include).map((tag) => tag.name);
  const excluded = tags.filter((tag) => !tag.include).map((tag) => tag.name);

  if (!included.length && !excluded.length) return {};
  if (included.length && excluded.length)
    return {
      $and: [{ tags: { $all: included }, tags: { $nin: excluded } }],
    };
  if (included.length) return { tags: { $all: included } };
  if (excluded.length) return { tags: { $nin: excluded } };

  return {};
};

/**
 * List of clips from the API
 */
const clipsAtom = selector({
  key: "clips",
  default: [],
  get: async ({ get }) => {
    const { results } = (
      await axios.post(url("api", "clip"), {
        query: makeQuery(get(selectedTagsAtom)),
        opts: { sort: { index: 1 }, limit: 24 },
      })
    ).data;
    return results;
  },
});

const selectedClipIdsAtom = atom({
  key: "selectedClipIds",
  default: [],
});

const selectedClipsAtom = selector({
  key: "selectedClips",
  default: [],
  get: async ({ get }) => {
    const { results } = (
      await axios.post(url("api", "clip"), {
        query: { _id: { $in: get(selectedClipIdsAtom) } },
        opts: { sort: { index: 1 } },
      })
    ).data;
    return results;
  },
});

const sharedTagsAtom = selector({
  key: "sharedtags",
  default: [],
  get: async ({ get }) => {
    const clips = get(selectedClipsAtom);

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
  },
});

// Prevents WebPack from hotloading the recoil module
// so that when new atoms / selectors are made, the entire
// page refreshes. Otherwise recoil throws an error
module.hot.decline();

export {
  clipsAtom,
  selectedTagsAtom,
  clipTagsAtom,
  allTagsAtom,
  selectedClipIdsAtom,
  selectedClipsAtom,
  sharedTagsAtom,
};
