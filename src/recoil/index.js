import axios from "axios";
import { atom, selector } from "recoil";
import { url } from "../config";

const tags = atom({
  key: "tags",
  default: [],
});

const query = (tags) =>
  tags.length ? { query: { tags: { $all: tags } } } : { query: {} };

const clips = selector({
  key: "clips",
  default: [],
  get: async ({ get }) => {
    const { results } = (await axios.post(url("api", "clip"), query(get(tags))))
      .data;
    return results;
  },
});

// Prevents WebPack from hotloading the recoil module
// so that when new atoms / selectors are made, the entire
// page refreshes. Otherwise recoil throws an error
module.hot.decline();

export { clips, tags };
