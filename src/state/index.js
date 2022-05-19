import { atom, selector } from "recoil";

// Config
import { url, limit } from "../config";
import placeholdertaglist from "../tags";

// Helpers
import { getSharedTags, makeQuery } from "./stateHelpers";

// Networking
import axios from "axios";

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
    return getSharedTags(clips);
  },
});

export {
  clipsAtom,
  clipsQuery,
  selectedTagsAtom,
  clipTagsAtom,
  allTagsAtom,
  selectedClipIdsAtom,
  selectedClipsAtom,
  sharedTagsAtom,
};
