import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import BranchStaff from "./BranchStaff"
import UpdateStafff from "./UpdateStafff"
import StaffList from "./StaffList"
import StaffDetails from "./StaffDetails"

// 

const staff = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/BranchStaff`} />
       <Route path={`${match.url}/BranchStaff`} component={BranchStaff} /> 
       <Route path={`${match.url}/UpdateStafff`} component={UpdateStafff} /> 
       <Route path={`${match.url}/StaffList`} component={StaffList} /> 
       <Route path={`${match.url}/StaffDetails`} component={StaffDetails} /> 
      <Redirect to="/error" />
    </Switch>
  </div>
);

export default staff;