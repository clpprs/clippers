import React from "react";

// Fonts
import "@fontsource/roboto";
import "@fontsource/roboto-mono";

// Router
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Recoil
import { RecoilRoot } from "recoil";

// Components
import Navbar from "./components/Navbar";

// Pages
import Browse from "./pages/Browse";
import ClipPage from "./pages/Clip";
import About from "./pages/About";
import Anime from "./pages/Anime";

// Route pages
function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate replace to="/browse" />} />
          <Route path="/browse" element={<Browse />} />
        </Route>
        <Route path="/clip/:_id" element={<ClipPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/anime" element={<Anime />} />
      </Routes>
    </BrowserRouter>
  );
}

// Render App w/ theme
export function App(props) {
  import(`./index.css`);

  return (
    <RecoilRoot>
      <Navbar id="navigation" />
      <div id="content">
        <React.StrictMode>
          <Router />
        </React.StrictMode>
      </div>
    </RecoilRoot>
  );
}

export default App;
