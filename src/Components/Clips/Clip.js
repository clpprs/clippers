import { url } from "../../config";

const Clip = ({ clip, ...props }) => (
  <div className="clip-container">
    <video
      muted
      loop
      {...props}
      onMouseOver={(event) => event.target.play()}
      onMouseOut={(event) => {
        event.target.pause();
        event.target.currentTime = 0;
      }}
    >
      <source
        src={`${url("files")}/${clip.anime}/${clip.episode}/${clip.index}.mp4`}
        type="video/mp4"
      ></source>
      Clip file not found
    </video>
  </div>
);

export default Clip;
