import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import BrowserUI from "./pages/browser/BrowserUI";
import TimelineUI from "./pages/timeline/TimelineUI";
import Layout from "./Layout";

export default function App() {
    return (
      <React.StrictMode>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="browser" element={<BrowserUI />} />
              <Route path="timeline" element={<TimelineUI />} />
            </Route>
          </Routes>
        </HashRouter>
      </React.StrictMode>
    );
  }
console.log("working");
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);