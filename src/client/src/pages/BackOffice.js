import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardPage from './Dashboard';
import ItemPages from './Items';
import SalesPage from './Sales';
import ProductPages from './Products';
import ProductMapping from './ProductMapping';
import NotFoundPage from './NotFound';

import Layout from '../components/Layout/Layout';

const BackOffice = () => {
  const storeUrl = localStorage.getItem('storeUrl');

  return (
    <Layout>
      <Switch>
        <Route path={`/${storeUrl}/dashboard`} component={DashboardPage} />
        <Route path={`/${storeUrl}/item`} component={ItemPages} />
        <Route path={`/${storeUrl}/sales`} component={SalesPage} />
        <Route path={`/${storeUrl}/product`} component={ProductPages} />
        <Route path={`/${storeUrl}/product-mapping`} component={ProductMapping} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Layout>
  );
};

export default BackOffice;
