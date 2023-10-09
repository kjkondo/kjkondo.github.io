import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Import the App component
import "./index.css"; // Import your global CSS or styling

ReactDOM.render(
  <React.StrictMode>
    <App /> {/* Render the App component as the root component */}
  </React.StrictMode>,
  document.getElementById("root")
);
