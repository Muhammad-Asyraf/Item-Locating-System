import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import InventoryList from './InventoryList/InventoryList';
import InventoryItem from './InventoryItem';
import InventoryCreate from './InventoryCreate';

const Inventory = (props) => {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/list`} exact component={InventoryList} />
        <Route path={`${match.path}/item`} exact component={InventoryItem} />
        <Route path={`${match.path}/create`} exact component={InventoryCreate} />
      </Switch>
    </>
  );
};
export default withRouter(Inventory);
