import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddProduct from "./AddProduct"
import UpdateProduct from "./UpdateProduct"
import ProductList from "./ProductList"
import ProdDetails from "./ProdDetails"


const product = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/AddProduct`} />
       <Route path={`${match.url}/AddProduct`} component={AddProduct} />
       <Route path={`${match.url}/UpdateProduct`} component={UpdateProduct} />
       <Route path={`${match.url}/ProductList`} component={ProductList} /> 
       <Route path={`${match.url}/ProdDetails`} component={ProdDetails} /> 
      <Redirect to="/error" />
    </Switch>
  </div>
);

export default product;
