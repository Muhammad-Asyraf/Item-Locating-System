import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductList from './ProductList/ProductList';
// import ItemDetail from './ItemDetail';
// import ItemCreate from './ItemCreate';
// import ItemEdit from './ItemEdit';

const Product = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/list`} exact component={ProductList} />
        {/* <Route path={`${match.path}/item`} exact component={ItemDetail} />
        <Route path={`${match.path}/create`} exact component={ItemCreate} />
        <Route path={`${match.path}/edit/:uuid`} exact component={ItemEdit} /> */}
      </Switch>
    </>
  );
};
export default Product;
