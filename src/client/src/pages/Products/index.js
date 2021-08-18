import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductListPage from './ProductList';
import ProductCreatePage from './ProductCreate';
import ProductEditPage from './ProductEdit';

const Product = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/list`} exact component={ProductListPage} />
        <Route path={`${match.path}/create`} exact component={ProductCreatePage} />
        <Route path={`${match.path}/edit/:uuid`} exact component={ProductEditPage} />
      </Switch>
    </>
  );
};
export default Product;
