import React from "react";
import styled from "styled-components";

import death from "../images/death.jpg";
import reisir from "../images/reisir.jpg";
import hachi from "../images/hachi.webp";

const Nav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  padding: 0 1rem;

  position: fixed;
  top: 0;
  z-index: 9999;

  background-color: var(--header-background);

  vertical-align: middle;
  letter-spacing: 0.05em;

  & * {
    font-weight: bold;
    transition: all 0.15s ease-out;
  }

  & a:hover {
    text-decoration: underline;
    text-decoration-style: dotted;
    color: var(--highlight);
    text-decoration-color: var(--highlight);
  }
`;

const Logo = styled.div`
  height: 100%;

  & * {
    height: inherit;
  }
`;

const RightAligned = styled.div`
  flex: 1 1;
  height: 100%;

  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-end;

  gap: 1rem;

  & img {
    border-radius: 100%;
    height: 70%;
  }

  & img:first-of-type {
    position: relative;
    margin-right: -1.75rem;
    z-index: 9900;
  }
`;

export function Navbar(props) {
  return (
    <Nav {...props}>
      {/* <a href="/">BROWSE</a> */}
      <Logo>
        <a href="/">
          <img src={hachi} />
        </a>
      </Logo>
      <a href="/browse">BROWSE</a>
      <a href="/anime">ANIME</a>
      <a href="/about">ABOUT</a>
      <RightAligned>
        <p style={{ fontSize: "0.75rem" }}>Developed by: </p>
        <img src={death} />
        <img src={reisir} />
      </RightAligned>
    </Nav>
  );
}

export default Navbar;
