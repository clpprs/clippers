import React, { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import classNames from "classnames";

const DIV = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

export const Scroller = (props) => {
  return (
    <DIV className={classNames(props.className, "scroller")}>
      {props.children}
    </DIV>
  );
};

export default Scroller;
