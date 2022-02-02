import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// import classNames from 'classnames'

import "@fontsource/roboto";
import "@fontsource/roboto-mono";

import Navbar from "./Navbar";
// import SelectedTag from './Components/SelectedTag'
// import Tag from './Components/Tag'
import Sidebar from "./Sidebar";

function App(props) {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex bg-neutral-200 h-full">
        <div className="bg-neutral-350 sidebar">
          <Sidebar />
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
