import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardPage from './Dashboard';
import ItemPages from './Items';
import SalesPage from './Sales';
import ProductPages from './Products';
import NotFoundPage from './NotFound';

import Layout from '../components/Layout/Layout';

const BackOffice = (props) => {
  const { match } = props;

  return (
    <Layout>
      <Switch>
        <Route path={`${match.path}/dashboard`} component={DashboardPage} />
        <Route path={`${match.path}/item`} component={ItemPages} />
        <Route path={`${match.path}/sales`} component={SalesPage} />
        <Route path={`${match.path}/product`} component={ProductPages} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Layout>
  );
};

export default BackOffice;
