import React from "react";
import classNames from "classnames";

import { url } from "../config";
import { Tag } from "./Tags/Tag";

import styled from "styled-components";

const ClipMetadata = styled.div`
  transition: all 0.2s;
  overflow: hidden;
  position: absolute;
  z-index: 9000;
  width: 100%;
  top: 100%;
  left: 0;
  color: white;
  height: 0;
  background-color: transparent;

  & .tag-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 1rem;
    padding-bottom: var(--card-width);
  }

  & .tag {
    flex-grow: 0;
    width: auto;
  }
`;

const Metadata = React.memo(({ tags = [], ...props }) => (
  <ClipMetadata className={classNames("clip-metadata")}>
    <div className="tag-list">
      {tags.map((tag) => (
        <Tag name={tag} key={tag} />
      ))}
    </div>
  </ClipMetadata>
));

const ClipContainer = styled.div`
  --card-width: 1rem;
  transition: all 0.2s;
  display: block;
  position: relative;
  box-sizing: border-box;
  margin: var(--card-width);
  padding: 0rem;
  background-color: transparent;

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
    opacity: 0.5;
  }
`;

const ConditionalLink = ({ url, clickable, children }) =>
  clickable ? <a href={url}>{children}</a> : children;

export const Clip = React.memo(function (props) {
  const { _id, anime, episode, index, tags, clickable, className } = props;

  return (
    <ClipContainer className={classNames("clip", className)} id={_id}>
      <ConditionalLink url={`/clip/${_id}`} clickable={clickable}>
        <div className="clip-video-container">
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
        </div>
      </ConditionalLink>
      <Metadata tags={tags} />
    </ClipContainer>
  );
});

export default Clip;
