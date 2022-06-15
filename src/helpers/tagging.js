import axios from "axios";
import { url } from "../config";

export function addTag(tag, selectedClipIds) {
  return axios.patch(url("api", "clip"), {
    patch: { _id: selectedClipIds, tags: { add: [tag] } },
  });
}

export function removeTag(tag, selectedClipIds) {
  return axios.patch(url("api", "clip"), {
    patch: { _id: selectedClipIds, tags: { remove: [tag] } },
  });
}
