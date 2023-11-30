import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import store from "./components/redux/reduxStore.ts";
import { Provider } from "react-redux";
import SamuraiJsApp from "./App.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SamuraiJsApp />);
