import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Icons
import { IconContext } from "react-icons";
import { MdFileDownload } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

// Components
import classNames from "classnames";
import { Loader, TaggingField } from "../../components";

// Networking
import axios from "axios";
import { url, video } from "../../config";

// State
import { useSetRecoilState } from "recoil";
import { selectedClipIdsState } from "../../state";

const ClipPageContent = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: relative;

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
        <source src={video(props)} type="video/mp4"></source>
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

const BackButton = styled.a`
  display: block;
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 999;
  cursor: pointer;
`;

function ClipPage(props) {
  const { _id } = useParams();
  const [clip, setClip] = useState({});
  const setSelectedClipIds = useSetRecoilState(selectedClipIdsState);

  useEffect(() => {
    console.log(`Setting clip ${_id} as selected`);
    setSelectedClipIds((clips) => [_id]); // replace selected clips
  }, [_id, setSelectedClipIds]);

  useEffect(() => {
    console.log(`Getting clip ${_id}`);
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
          <a
            href={`${video(clip)}?download=1`}
            // target="_blank"
            // rel="noreferrer"
            download={clip._id}
          >
            <MdFileDownload />
          </a>
        </ClipActionButtonContainer>
        <BackButton href="/">
          <BiArrowBack />
        </BackButton>
      </IconContext.Provider>
    </ClipPageContent>
  );
}

export default ClipPage;
