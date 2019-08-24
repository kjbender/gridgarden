import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Home from "./Home";
import Nav from './Nav';

const App = () => {
  return (
    <Fragment>
      <Nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Nav>
    </Fragment>
  )
};

export default withRouter(connect()(App));
