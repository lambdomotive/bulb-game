import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserDataProvider } from "./providers/UserDataProvider";
import WelcomePage from "./pages/WelcomePage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <UserDataProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <WelcomePage />
          </Route>
          <Route path="/game">
            <GamePage />
          </Route>
        </Switch>
      </Router>
    </UserDataProvider>
  );
}

export default App;
