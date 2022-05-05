import React, { Suspense } from "react";
import ReactDOM from "react-dom";

// Router
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Recoil
import { RecoilRoot, useRecoilValue } from "recoil";

// Fonts
import "@fontsource/roboto";
import "@fontsource/roboto-mono";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";

// Pages
import Browse from "./pages/Browse";

// Content wrapper
function Content(props) {
  return (
    <>
      <Sidebar className="w-64 flex-shrink-0 flex-grow-0 h-full" />
      <div className="content flex-grow overflow-x-hidden overflow-y-auto">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

// Route pages
function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Content />}>
          <Route index element={<Navigate replace to="/browse" />} />
          <Route path="/browse" element={<Browse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Render App w/ theme
function App(props) {
  import(`./index.css`);

  return (
    <div id="app" className="app overflow-hidden">
      <Navbar />
      <div id="content" className="flex flex-row w-full h-full">
        <Router />
      </div>
    </div>
  );
}

// Wrap everything in RecoilRoot
ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById("root")
);
