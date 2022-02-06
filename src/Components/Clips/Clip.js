import React from "react";
import classNames from "classnames";

import { url } from "../../config";
import { useRecoilValue } from "recoil";

import { themeAtom } from "../../state";
import { Tag, SelectedTag } from "../Tags";

function DeathMetadata({ clip, ...props }) {
  const { tags = [] } = clip;

  return (
    <div className="clip-metadata">
      <div className="clip-metadata-tags flex flex-wrap gap-1 p-2">
        {tags.map((tag) => (
          <SelectedTag tag={{ name: tag }} nobutton />
        ))}
      </div>
    </div>
  );
}

function ResidenceMetadata({ clip, ...props }) {
  const { tags = [] } = clip;

  return (
    <div className="clip-metadata">
      <div className="tag-list">
        {tags.map((tag) => (
          <Tag name={tag} key={tag} className="tag" />
        ))}
      </div>
    </div>
  );
}

function Clip({ clip, ...props }) {
  const theme = useRecoilValue(themeAtom);

  const Metadata = theme === "death" ? DeathMetadata : ResidenceMetadata;

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
