import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ImageComponent from "./ImageComponent.jsx";
import VideoPlayer from "./VideoPlayer";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <ImageComponent />
    <VideoPlayer></VideoPlayer>
  </React.StrictMode>,
);
