import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main"; // Import the Main component
import Photos from "./components/Photos"; // Import the Photos component
import Videos from "./components/Videos"; // Import the Videos component
import Code from "./components/Code"; // Import the Code component
import Rants from "./components/Rants"; // Import the Rants component

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />{" "}
        {/* Main component as the homepage */}
        <Route path="/photos" component={Photos} />
        <Route path="/videos" component={Videos} />
        <Route path="/code" component={Code} />
        <Route path="/rants" component={Rants} />
      </Switch>
    </Router>
  );
}

export default App;
