import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";

// Components
import classNames from "classnames";

// Networking
import axios from "axios";
import { url } from "../../config";

// State
const AnimePageContent = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: relative;

  & > * {
    max-width: 62rem;
    margin-bottom: 1rem;
  }
`;

const AnimeContainer = styled.a`
  display: block;
  height: 20rem;
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid lightgray;
  position: relative;

  & h2 {
    display: block;
    position: absolute;
    width: calc(100% - 2rem);
    background-color: white;
    text-align: center;
    z-index: 1;
    top: -1rem;
  }

  & img {
    position: relative;
    z-index: 2;
    width: auto;
    height: 100%;
    border-radius: 0.25rem;
  }
`;

function Anime(props) {
  const { anime } = props;

  return (
    <AnimeContainer href="/browse">
      <img src={url("files", `${anime._id}/covers/a.jpg`)} />
      <h2>{anime.title}</h2>
    </AnimeContainer>
  );
}

function ClipPage(props) {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    console.log("Getting anime");
    axios
      .post(url("api", "anime"), { query: {}, opts: { limit: 1 } })
      .then(({ data }) => setAnimes(data.results));
  }, [setAnimes]);

  return (
    <AnimePageContent className={classNames("clip-page-content")}>
      {animes.map((anime) => (
        <Anime key={anime._id} anime={anime} />
      ))}
    </AnimePageContent>
  );
}

export default ClipPage;
