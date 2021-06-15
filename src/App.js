import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Switch>
          <Routes />
        </Switch>
      </UserContextProvider>
    </Router>
  );
}

export default App;
