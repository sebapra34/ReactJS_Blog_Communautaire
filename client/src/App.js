import TopBar from "./components/TopBar";
import Home from "./pages/accueil/Accueil"
import Register from "./pages/register/Register";
import Connec from "./pages/connec/Connec";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";




function App() {

const {user} = useContext(Context);

  return (
    <Router>
      <div className="App">
      <TopBar />
      <Switch>
        
        <Route exact path="/">
          <Home />
        </Route>

        {/* redirection vers Home si l'user est log */}
        <Route path="/register">
          {user ? <Home /> : <Register />}
        </Route>

        {/* redirection vers Home si l'user est log */}
        <Route path="/login">
          {user ? <Home /> : <Connec />}
        </Route>

        <Route path="/post/:postId">
          <Single />
        </Route>

        {/* redirection vers Register si NOT log */}
        <Route path="/write">
          {user ? <Write /> : <Register />}
        </Route>

        {/* redirection vers Register si NOT log */}
        <Route path="/settings">
          {user ? <Settings /> : <Register />}          
        </Route>

      </Switch>
      </div>
    </Router>
  );
}

export default App;
