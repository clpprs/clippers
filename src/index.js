import React from "react";
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
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import Loader from "./components/Loader";

// Styles and fonts
import "./index.css";
import "@fontsource/roboto";
import "@fontsource/roboto-mono";

// Custom components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Pages
import Browse from "./pages/Browse";

const App = (props) => (
  <div className="app h-full w-full overflow-hidden">
    <Navbar />
    <div className="main flex flex-row w-full h-full">
      <Sidebar className="w-64 flex-shrink-0 flex-grow-0 h-full" />
      <div className="content flex-grow overflow-x-hidden overflow-y-auto">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  </div>
);

function Router(props) {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate replace to="/browse" />} />
            <Route path="/browse" element={<Browse />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

ReactDOM.render(<Router />, document.getElementById("root"));
