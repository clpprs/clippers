import styled from "styled-components";

export const BrowseContent = styled.div`
  padding-left: var(--sidebar-width);
  width: 100%;

  &::after {
    display: block;
    height: 16rem;
    width: 100%;
    // Scryfall reference
    content: "This search is finished. Now the real work can begin.";
    line-height: 16rem;
    text-align: center;
    font-style: italic;
    font-size: 0.8rem;
    opacity: 0.25;
  }
`;

export default BrowseContent;
