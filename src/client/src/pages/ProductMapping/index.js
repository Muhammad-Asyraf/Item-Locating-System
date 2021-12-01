import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductPositioning from './Positioning';
import LayoutEditor from './LayoutEditor';

const ProductMapping = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/positioning`} exact component={ProductPositioning} />
        <Route path={`${match.path}/layout-editor`} exact component={LayoutEditor} />
      </Switch>
    </>
  );
};
export default ProductMapping;
