import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductList from './ProductList/ProductList';
import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';

const Product = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/list`} exact component={ProductList} />
        <Route path={`${match.path}/create`} exact component={ProductCreate} />
        <Route path={`${match.path}/edit/:uuid`} exact component={ProductEdit} />
      </Switch>
    </>
  );
};
export default Product;
