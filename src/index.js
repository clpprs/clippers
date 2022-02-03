import React from "react";
import ReactDOM from "react-dom";

// Router
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

// Recoil
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

// Styles and fonts
import "./index.css";
import "@fontsource/roboto";
import "@fontsource/roboto-mono";

// Custom components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Clips } from "./components/Clips";

const App = (props) => (
  <div className="app h-full w-full overflow-hidden">
    <RecoilRoot>
      <Navbar />
      <div className="main flex flex-row w-full h-full">
        <Sidebar className="w-64 flex-shrink-0 flex-grow-0" />
        <div className="content flex-grow overflow-x-hidden overflow-y-auto">
          <Suspense fallback={<CircularProgress />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </RecoilRoot>
  </div>
);

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Clips />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Router />, document.getElementById("root"));
