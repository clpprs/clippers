import axios from "axios";
import { atom, selector } from "recoil";
import { url, limit } from "../config";

import placeholdertaglist from "../tags";

/**
 * All available tags
 */
const allTagsAtom = atom({
  key: "allTags",
  default: placeholdertaglist,
});

/**
 * List of selected tag objects `{ name: "tagName", include: Boolean }`
 */
const selectedTagsAtom = atom({
  key: "selectedTags",
  default: [],
});

/**
 *
 * @param {Array} tags Array of tag objects { name: String, include: Boolean }
 * @returns
 */
const makeQuery = (tags) => {
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

/**
 * Raw query result from API
 */
const clipsQuery = selector({
  key: "clipsQuery",
  default: [],
  get: async ({ get }) => {
    const { data } = await axios.post(url("api", "clip"), {
      query: makeQuery(get(selectedTagsAtom)),
      opts: { sort: { index: 1 }, limit },
    });
    return data;
  },
});

/**
 * List of clips from the query
 */
const clipsAtom = selector({
  key: "clips",
  default: [],
  get: async ({ get }) => {
    const query = get(clipsQuery);
    // console.log(query);
    return query.results;
  },
});

/**
 * tagCounts from the query metadata
 */
const clipTagsAtom = selector({
  key: "clipTags",
  default: placeholdertaglist,
  get: ({ get }) => {
    const query = get(clipsQuery);
    return query.metadata.tagCounts;
  },
});

// clip._id's selected with Selecto
const selectedClipIdsAtom = atom({
  key: "selectedClipIds",
  default: [],
});

// selected clip data objects from the API
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

// tags shared by currently selected clips
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
