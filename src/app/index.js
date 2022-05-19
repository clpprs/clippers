import React from "react";

// Recoil
import { RecoilRoot } from "recoil";

// Router
import Router from "./router";

// Components
import Navbar from "../components/Navbar";

export function App(props) {
  return (
    <RecoilRoot>
      <Navbar id="navigation" />
      <div id="content">
        <Router />
      </div>
    </RecoilRoot>
  );
}

export default App;
