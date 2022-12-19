import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddBranch from "./AddBranch"
import DetailsBranch from "./DetailsBranch"
import BranchList from "./BranchList"

// 

const branch = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/AddBranch`} />
       <Route path={`${match.url}/AddBranch`} component={AddBranch} /> 
       <Route path={`${match.url}/DetailsBranch`} component={DetailsBranch} /> 
       <Route path={`${match.url}/BranchList`} component={BranchList}/>
      <Redirect to="/error" />
    </Switch>
  </div>
);

export default branch;
