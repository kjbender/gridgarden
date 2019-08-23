import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Home from "./Home";
import Nav from './Nav';
import Plot from "./Plot";

const App = () => {
  return (
    <Fragment>
      <Nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/plot" component={Plot} />
          <Redirect to="/" />
        </Switch>
      </Nav>
    </Fragment>
  )
};

// function mapStateToProps(state) {
//   return { zone: state.zone }
// };
//export default withRouter(connect(mapStateToProps)(App));

export default withRouter(connect()(App));
