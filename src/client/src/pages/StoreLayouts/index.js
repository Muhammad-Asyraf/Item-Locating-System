import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductMappingPage from './ProductMapping';
import LayoutListPage from './LayoutList';
import LayoutCreatePage from './LayoutCreate';
import LayoutEditPage from './LayoutEdit';

const Layout = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/list`} exact component={LayoutListPage} />
        <Route path={`${match.path}/create`} exact component={LayoutCreatePage} />
        <Route path={`${match.path}/edit/:uuid`} exact component={LayoutEditPage} />
        <Route
          path={`${match.path}/product-mapping/:uuid`}
          exact
          component={ProductMappingPage}
        />
        <Route path={`${match.path}/product-mapping`} exact component={ProductMappingPage} />
        {/* <Route path={`${match.path}/layout-editor`} exact component={LayoutEditor} /> */}
      </Switch>
    </>
  );
};
export default Layout;
