import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RecipesProvider } from "./context/recipeContext";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import {} from "react-router-dom";

const App: React.FC<{}> = () => {
  return (
    <RecipesProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/recipe/:recipe_id">
            <Recipe />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/compare">
            <Compare />
          </Route>
        </Switch>
      </Router>
    </RecipesProvider>
  );
};

export default App;
