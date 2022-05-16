import React from "react";
import styled from "styled-components";

import hachi from "../images/hachi.webp";

const Nav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  padding: 0 1rem;

  position: fixed;
  top: 0;
  z-index: 9999;

  background-color: black;
  color: white;

  vertical-align: middle;
  letter-spacing: 0.05em;

  & img:hover {
    filter: hue-rotate(180deg) contrast(125%) brightness(0.75);
  }

  & * {
    font-weight: bold;
    transition: all 0.15s ease-out;
  }

  & a:hover {
    text-decoration: underline;
    text-decoration-style: dotted;
    color: var(--link-highlight-color);
    text-decoration-color: var(--link-highlight-color);
  }
`;

const Logo = styled.div`
  height: 100%;
  & * {
    height: inherit;
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
      <a href="/anime">ANIME</a>
      <a href="/about">ABOUT</a>
    </Nav>
  );
}

export default Navbar;
