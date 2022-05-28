import React from "react";

// Recoil
import { RecoilRoot } from "recoil";

// Router
import { BrowserRouter as Router } from "react-router-dom";

// Components
import Navbar from "../components/Navbar";

// Content
import Content from "./content";

export function App(props) {
  return (
    <RecoilRoot>
      <Router>
        <Navbar id="navigation" />
        <Content />
      </Router>
    </RecoilRoot>
  );
}

export default App;
