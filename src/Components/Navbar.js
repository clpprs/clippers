import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100vw;

  background-color: black;
  color: white;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-content: space-around;

  vertical-align: middle;
  font-weight: 600;
  letter-spacing: 0.025em;
`;

export function Navbar(props) {
  return (
    <NavbarContainer id="navigation">
      <a href="/">CLIPPERS</a>
      <a href="/about">ABOUT</a>
    </NavbarContainer>
  );
}

export default Navbar;
