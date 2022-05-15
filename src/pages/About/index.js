import classNames from "classnames";
import React from "react";

import styled from "styled-components";

import drip from "./drip.jpg";
import hachi from "../../images/hachi.webp";

const Flexer = styled.div`
  padding: 4rem 0;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 1rem;

  & > * {
    width: 100%;
    max-width: 62rem;
  }

  a {
    color: var(--included-color);
    padding: 0 0.25rem;
    background-color: darkslategray;
  }
`;

export function About(props) {
  return (
    <div
      id="scroller"
      className={classNames("overflow-y-scroll", "h-full", "w-full")}
    >
      <Flexer className="flexer">
        <img src={hachi} className="max-w-min" />
        <p>
          Clippers is a Monogatari Series clip database where users can tag,
          search and download clips.
        </p>
        <p>
          To get started, see the <a href="/browse">/browse</a> page.{" "}
        </p>
        <p>
          To contribute, search for clips without the bakemonogatari tag. To add
          tags, hold shift, select clips, then right click to bring up the menu.
          If you feel like clips have all the tags they need, add the
          bakemonogatari tag. You can also add tags on the individual clip
          pages.
        </p>
        <p>
          The current goal for Clippers is to get bakemonogatari in it's
          entirety uploaded and tagged.
        </p>
        <div className={classNames("spacer", "py-96")}></div>
        <img src={drip} className="max-w-2xl" />
      </Flexer>
    </div>
  );
}

export default About;
