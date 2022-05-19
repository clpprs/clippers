// Router
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Pages
import Browse from "../pages/Browse";
import ClipPage from "../pages/Clip";
import About from "../pages/About";
import Anime from "../pages/Anime";

// Route pages
export function Router(props) {
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

export default Router;
