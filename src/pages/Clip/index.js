import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Fontawesome
import { MdFileDownload } from "react-icons/md";

// Components
import classNames from "classnames";
import { Loader, TaggingField } from "../../components";

import axios from "axios";
import { url } from "../../config";

import { selectedClipIdsAtom } from "../../state";
import { useSetRecoilState } from "recoil";
import { IconContext } from "react-icons";

const ClipPageContent = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  & > * {
    width: 100%;
    max-width: 62rem;
    margin-bottom: 1rem;
  }
`;

function Video(props) {
  const { _id } = props;
  return (
    <div id={_id} className={props.className}>
      <video loop controls>
        <source src={url(props)} type="video/mp4"></source>
        Clip file not found
      </video>
    </div>
  );
}

// Tag autocomplete field under clip
const TaggingContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const ClipActionButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    margin-right: 1rem;
  }

  & svg {
    opacity: 0.7;
    cursor: pointer;
    transition: all 0.1s;
  }

  & svg:hover {
    opacity: 1;
  }
`;

function ClipPage(props) {
  const { _id } = useParams();
  const [clip, setClip] = useState({});
  const setSelectedClipIds = useSetRecoilState(selectedClipIdsAtom);

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
  }, [_id]);

  useEffect(() => {
    console.log("Setting clip as selected");
    setSelectedClipIds((clips) => [_id]); // replace selected clips
  }, [_id, setSelectedClipIds]);

  return (
    <ClipPageContent className={classNames("clip-page-content")}>
      <IconContext.Provider value={{ size: "2rem" }}>
        <h2>{`${clip.anime} - ${clip.episode} - ${clip.index}`}</h2>
        <div>{clip._id && <Video {...clip} className={classNames()} />}</div>
        <TaggingContainer className={classNames("clip-tagging-container")}>
          <Suspense fallback={<Loader />}>
            <TaggingField />
          </Suspense>
        </TaggingContainer>
        <ClipActionButtonContainer>
          <a href={url(clip, true)} target="_blank" rel="noreferrer" download>
            <MdFileDownload />
          </a>
        </ClipActionButtonContainer>
      </IconContext.Provider>
    </ClipPageContent>
  );
}

export default ClipPage;
