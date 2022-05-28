import React from "react";

// Router
import { Route, Routes, Navigate } from "react-router-dom";

// Pages
import Browse from "../pages/Browse";
import ClipPage from "../pages/Clip";
import About from "../pages/About";
import Anime from "../pages/Anime";
import styled from "styled-components";

// Styled Components
const Container = styled.div``;

// Route pages
export function Content(props) {
  return (
    <Container id="content">
      <Routes>
        <Route path="/">
          <Route index element={<Navigate replace to="/browse" />} />
          <Route path="/browse" element={<Browse />} />
        </Route>
        <Route path="/clip/:_id" element={<ClipPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/anime" element={<Anime />} />
      </Routes>
    </Container>
  );
}

export default Content;
