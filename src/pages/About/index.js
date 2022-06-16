import React from "react";
import styled from "styled-components";
import classNames from "classnames";

// Images
import drip from "../../images/drip.jpg";
import hachi from "../../images/hachi.webp";
import residence from "../../images/residence.png";

const Flexer = styled.div`
  padding: 4rem 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 1rem;

  & ul {
    list-style-type: square;
  }

  & ul li::marker {
    content: "-  ";
  }

  & > * {
    width: 100%;
    max-width: 62rem;
  }

  a {
    color: var(--highlight);
    text-decoration: underline;
    text-decoration-style: dotted;
    padding: 0 0.25rem;
  }

  img {
    transition: all 0.25s ease-in-out;
    max-width: min-content;
    position: relative;
  }

  & #hachi {
    position: absolute;
    top: 5%;
    left: 45%;
  }

  & #residence:hover #hachi {
    top: -20%;
  }

  & #residence {
    display: flex;
    justify-content: center;
  }

  li.done {
    text-decoration: line-through;
  }
`;

export function About(props) {
  return (
    <Flexer className="flexer">
      <div id="residence" style={{ position: "relative" }}>
        <img src={hachi} id="hachi" />
        <img src={residence} />
      </div>
      <p>
        Clippers is a
        <a
          href="https://www.reddit.com/r/anime/comments/acwgj7/monogatari_series_simple_watch_order_guide_2019/"
          target="_blank"
        >
          Monogatari Series
        </a>
        clip database where users can tag, search and download clips. The name
        is bound to change, probably.
      </p>
      <p>
        Our current goal is to get Bakemonogatari in it's entirety uploaded and
        tagged.
      </p>
      <p>
        To get started, check out the <a href="/browse">/browse</a> page.{" "}
      </p>
      <p>
        Join our
        <a href="https://discord.gg/Gq2TzPvt5H" target="_blank">
          Discord server
        </a>
        to give feedback and ask questions!
      </p>

      <h4>Tagging clips</h4>
      <p>
        Search for clips with the <em>tagme</em> tag. To add tags, hold shift,
        click to select clips, then use the sidebars tagging menu to remove or
        add tags. All tag edits will apply to all selected clips.
      </p>
      <p>You can also hold shift and drag to select multiple clips easily.</p>
      <p>
        Once you feel like the clip(s) have all the tags they need, add the{" "}
        <em>bakemonogatari</em> tag and remove the <em>tagme</em> tag.
      </p>

      <div className={classNames("spacer", "py-6")}></div>
      <h3>Clippers roadmap</h3>
      <ol>
        <li>Closed beta testing</li>
        <li className="done">Update the browse page when tags are changed</li>
        <li className="done">Load thumbnails before full videos</li>
        <li>Bulk download</li>
        <li>New tag suggestions</li>
        <li>Add timecode data to clips</li>
        <li>User accounts</li>
        <li>Better rating tags</li>
      </ol>

      <div className={classNames("spacer", "py-6")}></div>
      <h3>Longterm goals</h3>
      <ul>
        <li>Upload and tag the entirety of the Monogatari Series</li>
        <li>Create bulk downloads for all clips in a season</li>
        <li>
          Create project files with clip bins for the most common editing
          programs
        </li>
        <li>Include other anime in the database</li>
      </ul>

      <div className={classNames("spacer", "py-96")}></div>
      <img src={drip} style={{ maxWidth: "42rem" }} />
      <div className={classNames("spacer", "py-6")}></div>

      <p style={{ textAlign: "center" }}>
        check out
        <a href="https://www.sugoi-media.com/" target="_blank">
          sugoi-media
        </a>
        for curated clips from other series
      </p>
    </Flexer>
  );
}

export default About;
