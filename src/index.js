import React from "react";
import ReactDOM from "react-dom";

// Router
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

// Styles and fonts
import "./index.css";
import "@fontsource/roboto";
import "@fontsource/roboto-mono";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const App = (props) => (
  <div className="h-screen">
    <Navbar></Navbar>
    <div className="flex bg-neutral-200 h-full">
      <div className="bg-neutral-350 sidebar">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  </div>
);

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Router />, document.getElementById("root"));
