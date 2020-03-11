import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/routing/PrivateRoute";

import AuthState from "./context/auth/AuthState";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <AuthState>
      <Fragment>
        <Router>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Fragment>
    </AuthState>
  );
};

export default App;
