import React, { useState } from "react";
import classNames from "classnames";

import { video, thumbnail } from "../config";
import { Tag } from "./Tags/Tag";

import styled from "styled-components";

// const curve = "cubic-bezier(0.87, 0, 0.13, 1)";
const duration = "0.3s";
const curve = "cubic-bezier(0.22, 1, 0.36, 1)";

const ClipMetadata = styled.div`
  transition: all ${duration} ${curve};
  overflow: hidden;
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 0;
  top: 100%;
  left: 0;
  color: white;
  background-color: transparent;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
  padding-bottom: var(--card-width);
`;

const StyledTag = styled(Tag)`
  padding: 0.1rem 0.5rem;
`;

const Metadata = React.memo(({ tags = [], ...props }) => (
  <ClipMetadata className={classNames("clip-metadata")}>
    <TagList className="tag-list">
      {tags.map((tag) => (
        <StyledTag name={tag} key={tag} />
      ))}
    </TagList>
  </ClipMetadata>
));

const ClipContainer = styled.div`
  --card-width: 1rem;

  transition-property: margin, padding;
  transition-duration: ${duration};
  /* transition-timing-function: ease-in-out; */
  transition-timing-function: ${curve};

  display: block;
  position: relative;
  margin: var(--card-width);
  padding: 0rem;
  background-color: transparent;

  border-color: transparent;

  &:not(.selected):hover {
    background-color: var(--card-background);
    padding: var(--card-width);
    margin: 0rem;
  }

  &:not(.selected):hover .clip-metadata {
    height: auto;
    top: 100%;
    width: 100%;
    left: 0;
    padding: 0 var(--card-width);
    background-color: var(--card-background);
  }

  &.selected {
    outline: var(--highlight) dashed 4px;
    outline-offset: 4px;
  }
`;

const ClipVideoContainer = styled.div`
  /* force clip video to 16:9 */
  width: 100%;
  position: relative;
  aspect-ratio: 16/9;

  /* center video inside container */
  & video {
    position: relative;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & .thumbnail {
    position: absolute;
    width: 100%;
    top: 0;
  }

  &.loaded .thumbnail {
    opacity: 0;
  }
`;

const ConditionalLink = ({ url, clickable, children }) =>
  clickable ? <a href={url}>{children}</a> : children;

export const Clip = React.memo(function (props) {
  const { _id, anime, episode, index, tags, clickable, className } = props;

  const [loaded, setLoaded] = useState(false);

  const onMouseEnter = (e) => e.currentTarget.querySelector("video").play();
  const onMouseOut = (e) => {
    e.currentTarget.querySelector("video").pause();
    e.currentTarget.querySelector("video").currentTime = 0;
  };

  return (
    <ClipContainer
      className={classNames("clip", className)}
      id={_id}
      onMouseEnter={onMouseEnter}
      onMouseOut={onMouseOut}
    >
      <ConditionalLink url={`/clip/${_id}`} clickable={clickable}>
        <ClipVideoContainer
          onMouseDown={(e) => e.preventDefault()}
          className={classNames("clip-video-container", loaded && "loaded")}
        >
          <video
            muted
            loop
            draggable="false"
            className="clip-video"
            preload="none"
            onLoadedData={(e) => setLoaded(true)}
          >
            <source
              src={video({ anime, episode, index })}
              type="video/mp4"
            ></source>
            Clip file not found
          </video>
          <img
            className="thumbnail"
            src={thumbnail({ anime, episode, index })}
          />
        </ClipVideoContainer>
      </ConditionalLink>
      <Metadata tags={tags} />
    </ClipContainer>
  );
});

export default Clip;
