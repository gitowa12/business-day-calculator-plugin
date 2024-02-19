import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { KintoneRestAPIClient } from "@kintone/rest-api-client";

const root = createRoot(document.getElementById("config-root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
