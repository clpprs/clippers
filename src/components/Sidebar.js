import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const SidebarContainer = styled.div`
  position: fixed;
  padding: 0.5rem;
  height: 100%;

  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;

  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  max-width: var(--sidebar-width);
`;

export function Sidebar({ className, children, ...props }) {
  return (
    <SidebarContainer id="sidebar" className={classNames("sidebar", className)}>
      {children}
    </SidebarContainer>
  );
}

export default Sidebar;
