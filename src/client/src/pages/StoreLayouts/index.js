import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductMapping from './ProductMapping';
// import LayoutEditor from './LayoutEditor';
import LayoutList from './LayoutList';
import LayoutCreate from './LayoutCreate';
import LayoutEdit from './LayoutEdit';

const Layout = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/list`} exact component={LayoutList} />
        <Route path={`${match.path}/create`} exact component={LayoutCreate} />
        <Route path={`${match.path}/edit`} exact component={LayoutEdit} />
        <Route path={`${match.path}/product-mapping`} exact component={ProductMapping} />
        {/* <Route path={`${match.path}/layout-editor`} exact component={LayoutEditor} /> */}
      </Switch>
    </>
  );
};
export default Layout;
