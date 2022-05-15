import React from "react";
import styled from "styled-components";

import hachi from "../images/hachi.webp";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  z-index: 9999;

  background-color: black;
  color: white;

  display: flex;
  flex-flow: row nowrap;

  gap: 1rem;
  padding: 0 1rem;

  vertical-align: middle;
  font-weight: 600;
  letter-spacing: 0.025em;
`;

const Logo = styled.div`
  height: 100%;
  & * {
    height: inherit;
  }
`;

export function Navbar(props) {
  return (
    <NavbarContainer {...props}>
      <a href="/">BROWSE</a>
      <Logo>
        <a href="/">
          <img src={hachi} />
        </a>
      </Logo>
      <a href="/anime">ANIME</a>
      <a href="/about">ABOUT</a>
    </NavbarContainer>
  );
}

export default Navbar;
