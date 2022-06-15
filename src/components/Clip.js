import React from "react";
import classNames from "classnames";

import { url } from "../config";
import { Tag } from "./Tags/Tag";

import styled from "styled-components";

const ClipMetadata = styled.div`
  transition: all 0.2s;
  overflow: hidden;
  position: absolute;
  z-index: 9999;
  width: 100%;
  top: 100%;
  left: 0;
  color: white;
  height: 0;
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
  transition: all 0.2s;
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
`;

const ConditionalLink = ({ url, clickable, children }) =>
  clickable ? <a href={url}>{children}</a> : children;

export const Clip = React.memo(function (props) {
  const { _id, anime, episode, index, tags, clickable, className } = props;

  return (
    <ClipContainer className={classNames("clip", className)} id={_id}>
      <ConditionalLink url={`/clip/${_id}`} clickable={clickable}>
        <ClipVideoContainer className="clip-video-container">
          <video
            muted
            loop
            draggable="false"
            className="clip-video"
            onMouseEnter={(event) => event.target.play()}
            onMouseOut={(event) => {
              event.target.pause();
              event.target.currentTime = 0;
            }}
          >
            <source
              src={url({ anime, episode, index })}
              type="video/mp4"
            ></source>
            Clip file not found
          </video>
        </ClipVideoContainer>
      </ConditionalLink>
      <Metadata tags={tags} />
    </ClipContainer>
  );
});

export default Clip;
