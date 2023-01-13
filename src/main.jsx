import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// bootstrap
import "./custom-bootstrap.scss";
//import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.bundle";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
