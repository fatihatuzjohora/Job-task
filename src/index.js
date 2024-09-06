import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// https://codesandbox.io/p/sandbox/mk927g?file=%2Fsrc%2Findex.js   Linkshare
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
