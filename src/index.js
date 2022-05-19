import React from "react";
import { createRoot } from "react-dom/client";

// Fonts
import "@fontsource/roboto";
import "@fontsource/roboto-mono";

// Stylesheet
import "./index.css";

// Entry component
import App from "./app";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
