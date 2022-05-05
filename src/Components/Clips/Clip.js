import React from "react";
import classNames from "classnames";

import { url } from "../../config";
import { Tag } from "../Tags/Tag";

import "./clip.css";

function Metadata({ clip, ...props }) {
  const { tags = [] } = clip;

  return (
    <div className="clip-metadata">
      <div className="tag-list">
        {tags.map((tag) => (
          <Tag name={tag} key={tag} />
        ))}
      </div>
    </div>
  );
}

// TODO: move clip.css to styled.div

function Clip({ clip, ...props }) {
  return (
    <div className="clip" id={clip._id}>
      <div className="clip-video-container">
        <video
          muted
          loop
          {...props}
          className="clip-video"
          onMouseOver={(event) => event.target.play()}
          onMouseOut={(event) => {
            event.target.pause();
            event.target.currentTime = 0;
          }}
        >
          <source
            src={`${url("files")}/${clip.anime}/${clip.episode}/${
              clip.index
            }.mp4`}
            type="video/mp4"
          ></source>
          Clip file not found
        </video>
      </div>
      <Metadata clip={clip} />
    </div>
  );
}

export default Clip;
