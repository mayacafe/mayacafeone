import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdmiProfileAccount from "./AdmiProfileAccount"
// 

const admiprofile = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/AdmiProfileAccount`} />
       <Route path={`${match.url}/AdmiProfileAccount`} component={AdmiProfileAccount} /> 
      <Redirect to="/error" />
    </Switch>
  </div>
);

export default admiprofile;