import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";

// Components
import classNames from "classnames";
import Scroller from "../../components/Scroller";

// Networking
import axios from "axios";
import { url } from "../../config";
import setTitle from "../../helpers/setTitle";

const AnimeContainer = styled.a`
  --padding: 1rem;
  --transition: all 0.25s ease-out;

  display: block;
  height: 20rem;
  padding: var(--padding);
  border-radius: 0.25rem;
  border: 1px solid darkgray;
  position: relative;
  transition: var(--transition);

  &:hover {
    --padding: 0.5rem;
    border-color: lightgray;
  }

  & .anime-title {
    transition: var(--transition);
    display: block;
    position: absolute;
    width: calc(100% - (var(--padding) * 2));
    background-color: var(--app-background);
    text-align: center;
    z-index: 1;
    top: -1rem;
  }

  & .anime-cover {
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
      <img
        className="anime-cover"
        src={url("files", `${anime._id}/covers/a.jpg`)}
      />
      <span className="anime-title">{anime.title}</span>
    </AnimeContainer>
  );
}

const AnimePageContent = styled.div`
  position: relative;

  width: 100%;
  padding: 2rem 0;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  & > * {
    max-width: 62rem;
  }

  & #available-anime-list {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
  }
`;

export function ClipPage(props) {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    setTitle("Anime");
  }, []);

  useEffect(() => {
    console.log("Getting anime");
    axios
      .post(url("api", "anime"), { query: {}, opts: { limit: 1 } })
      .then(({ data }) => {
        let temp = data.results.concat(data.results);
        temp = temp.concat(temp);
        temp = temp.concat(temp);
        temp = temp.concat(temp);
        setAnimes(temp);
      });
  }, [setAnimes]);

  return (
    <AnimePageContent className={classNames("clip-page-content")}>
      <h1 className={classNames("text-2xl", "mb-16")}>Available anime</h1>
      <div id="available-anime-list" className={classNames("mb-16")}>
        {animes.map((anime, index) => (
          <Anime key={index} anime={anime} />
        ))}
      </div>
    </AnimePageContent>
  );
}

export default ClipPage;
