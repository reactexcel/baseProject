// require ('./lib/gridstack/gridstack.all')
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page404 from "./pages/Page404/Page404";
import Page500 from "./pages/Page500/Page500";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Internal from "./pages/Internal/Internal";
import Dapp from "./Dapp";
import SingUp from "./pages/SignUp/SignUp";
import Post from "./pages/Post/Post";

const App = props => {
  return (
    <BrowserRouter>
      <React.Suspense>
        <Switch>
          <Route
            exact
            path="/login"
            name="Sign In"
            render={props => <Login {...props} />}
          />
          <Route
            path="/post/:postId"
            name="Sign In"
            render={props => <Post {...props} />}
          />
          <Route
            exact
            path="/sign-up"
            name="Sign Up"
            render={props => <SingUp {...props} />}
          />
          <Route
            exact
            path="/old"
            name="Old"
            render={props => <Dapp {...props} />}
          />
          <Route
            exact
            path="/"
            name="Home"
            render={props => <Home {...props} />}
          />
          <Route
            path="/internal"
            name="Internal"
            render={props => <Internal {...props} />}
          />

          <Route
            exact
            path="/500"
            name="Page 500"
            render={props => <Page500 {...props} />}
          />

          <Route
            exact
            name="Page 404"
            render={props => <Page404 {...props} />}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};
export default App;
