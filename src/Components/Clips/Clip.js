import { url } from "../../config";

const Clip = ({ clip, ...props }) => (
  <video muted autoPlay {...props}>
    <source
      src={`${url("files")}/${clip.anime}/${clip.episode}/${clip.index}.mp4`}
      type="video/mp4"
    ></source>
    Clip not found
  </video>
);

export default Clip;
