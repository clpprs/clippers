import axios from "axios";
import { atom, selector } from "recoil";
import { url } from "../config";

import placeholdertaglist from "../tags";

const allTags = atom({
  key: "alltags",
  default: placeholdertaglist,
});

const clipTags = atom({
  key: "cliptags",
  default: placeholdertaglist,
});

const selectedTags = atom({
  key: "tags",
  default: [],
});

const query = (tags) => (tags.length ? { tags: { $all: tags } } : {});

const clipAtom = selector({
  key: "clips",
  default: [],
  get: async ({ get }) => {
    const { results } = (
      await axios.post(url("api", "clip"), {
        query: query(get(selectedTags)),
        opts: { sort: { index: 1 } },
      })
    ).data;
    return results;
  },
});

// Prevents WebPack from hotloading the recoil module
// so that when new atoms / selectors are made, the entire
// page refreshes. Otherwise recoil throws an error
module.hot.decline();

export { clipAtom, selectedTags, clipTags, allTags };
