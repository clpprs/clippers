import React from "react";
import styled from "styled-components";
import classNames from "classnames";

// Images
import drip from "../../images/drip.jpg";
import hachi from "../../images/hachi.webp";

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
    color: var(--link-highlight-color);
    text-decoration: underline;
    text-decoration-style: dotted;
    padding: 0 0.25rem;
  }
`;

export function About(props) {
  return (
    <Flexer className="flexer">
      <img src={hachi} style={{ maxWidth: "min-content" }} />
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
        Search for clips without the bakemonogatari tag (click the - on a tag to
        exclude it). To add tags, hold shift, click to select clips, then right
        click to bring up the menu. The tags will be added to all selected
        clips. You can also add tags on the individual clip pages.
      </p>
      <p>
        You can also hold shift and drag to select multiple clips easily.
        Firefox doesn't seem to respect the HTML draggable attribute nor the CSS
        user-select property on videos, so the drag should be initiated outside
        of the video thumbnail.
      </p>
      <p>
        Once you feel like the clip(s) have all the tags they need, add the
        bakemonogatari tag.
      </p>

      <div className={classNames("spacer", "py-6")}></div>
      <h3>Clippers roadmap</h3>
      <ol>
        <li>Closed beta testing</li>
        <li>Update the browse page when tags are changed</li>
        <li>Load thumbnails before full videos</li>
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
