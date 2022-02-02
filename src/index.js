import React from "react";
import ReactDOM from "react-dom";

// Router
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Styles and fonts
import "./index.css";
import "@fontsource/roboto";
import "@fontsource/roboto-mono";

import Navbar from "./Navbar";

const Home = (props) => (
  <div className="h-screen">
    <Navbar></Navbar>
    <div className="flex h-full bg-neutral-200">
      <div className="flex flex-col w-1/3 bg-neutral-350"></div>
    </div>
  </div>
);

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Router />, document.getElementById("root"));
