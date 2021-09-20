import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RecipesProvider } from "./context/recipeContext";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import Footer from "./components/Footer";
import "./App.css";

const App: React.FC<{}> = () => {
  return (
    <RecipesProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="App-content">
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
          </div>
          <Footer></Footer>
        </div>
      </Router>
    </RecipesProvider>
  );
};

export default App;
