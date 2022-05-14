import classNames from "classnames";
import styled from "styled-components";

const NavbarContainer = styled.div`
  background-color: black;
  color: white;
  position: fixed;
  top: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

function Navbar(props) {
  return (
    <NavbarContainer id="navigation">
      <div className="text-center">
        <a href="/">
          <h1
            className={classNames([
              "text-2xl",
              "font-semibold",
              "roboto-mono",
              "tracking-wide",
            ])}
          >
            CLIPPERS
          </h1>
        </a>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;
