import React, { Suspense, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

// Components
import classNames from "classnames";

import axios from "axios";
import { url } from "../../config";

function Clip(props) {
  const { _id, anime, episode, index } = props;
  return (
    <div id={_id} className={props.className}>
      <video muted autoPlay loop controls>
        <source
          src={`${url("files")}/${anime}/${episode}/${index}.mp4`}
          type="video/mp4"
        ></source>
        Clip file not found
      </video>
    </div>
  );
}

function ClipContent(props) {
  const { clip } = props;
  const tags = clip.tags || [];
  return (
    <div>
      <h1>Tags:</h1>
      <ul>
        {tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function ClipPage(props) {
  const { _id } = useParams();
  const [clip, setClip] = useState({});

  useEffect(() => {
    console.log("Getting clip");
    axios
      .post(url("api", "clip"), {
        query: { _id },
        opts: { limit: 1 },
      })
      .then((response) => {
        const c = response.data.results[0];
        console.log(c);
        setClip(c);
      });
  }, [true]);

  return (
    <div
      id="clip-content"
      className={classNames(
        "flex",
        "w-full",
        "h-full",
        "justify-evenly",
        "justify-items-center",
        "items-center"
      )}
    >
      <>{clip._id && <Clip {...clip} className={classNames("max-w-5xl")} />}</>
      <ClipContent clip={clip} />
    </div>
  );
}

export default ClipPage;
