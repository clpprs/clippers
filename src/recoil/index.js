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
const query = (tags) =>
  tags.length
    ? { tags: { $all: tags.filter((tag) => tags.include).map((t) => t.name) } }
    : {};

/**
 * List of clips from the API
 */
const clipsAtom = selector({
  key: "clips",
  default: [],
  get: async ({ get }) => {
    const { results } = (
      await axios.post(url("api", "clip"), {
        query: query(get(selectedTagsAtom)),
        opts: { sort: { index: 1 } },
      })
    ).data;
    return results;
  },
});

const selectedClipsAtom = atom({
  key: "selectedClips",
  default: [],
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
  selectedClipsAtom,
};
