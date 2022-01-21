import { Navigate, Outlet } from 'react-router-dom';

import LoginPage from './Login';
import SignUpPage from './Signup';
import MobileStoreLayout from './StoreLayouts/MobileStoreLayout';
// import ProductPages from '../pages/Products';

import ProductListPage from './Products/ProductList';
import ProductCreatePage from './Products/ProductCreate';
import ProductEditPage from './Products/ProductEdit';

import ProductMappingPage from './StoreLayouts/ProductMapping';
import LayoutListPage from './StoreLayouts/LayoutList';
import LayoutCreatePage from './StoreLayouts/LayoutCreate';
import LayoutEditPage from './StoreLayouts/LayoutEdit';

import PromotionListPage from './Promotions/PromotionList';
import PromotionCreatePage from './Promotions/PromotionCreate';
import PromotionEditPage from './Promotions/PromotionEdit';

import CampaignListPage from './Campaigns/CampaignList';
import CampaignCreatePage from './Campaigns/CampaignCreate';
import CampaignEditPage from './Campaigns/CampaignEdit';

import ItemListPage from './Items/ItemList';
import ItemCreatePage from './Items/ItemCreate';
import ItemEditPage from './Items/ItemEdit';

import ProfileDetailPage from './Profiles/ProfileDetail';
import ProfileEditPage from './Profiles/ProfileEdit';

import StoreDetailPage from './Stores/StoreDetail';
import StoreEditPage from './Stores/StoreEdit';

import NotFoundPage from './NotFound';

import Layout from '../components/Layout/Layout';

const Routes = (isAuthenticated, storeUrl) => [
  {
    path: '/auth',
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
    ],
  },
  {
    path: '/store/:uuid/layout',
    element: <MobileStoreLayout />,
  },
  {
    path: `/${storeUrl}`,
    element: isAuthenticated ? <Layout /> : <Navigate to="/auth/login" />,
    children: [
      {
        path: 'product',
        element: <Outlet />,
        children: [
          { path: 'list', element: <ProductListPage /> },
          { path: 'create', element: <ProductCreatePage /> },
          { path: 'edit/:uuid', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'layout',
        element: <Outlet />,
        children: [
          { path: 'list', element: <LayoutListPage /> },
          { path: 'create', element: <LayoutCreatePage /> },
          { path: 'edit/:uuid', element: <LayoutEditPage /> },
          { path: 'product-mapping', element: <ProductMappingPage /> },
          { path: 'product-mapping/:uuid', element: <ProductMappingPage /> },
        ],
      },
      {
        path: 'promotion',
        element: <Outlet />,
        children: [
          { path: 'list', element: <PromotionListPage /> },
          { path: 'create', element: <PromotionCreatePage /> },
          { path: 'edit/:uuid', element: <PromotionEditPage /> },
        ],
      },
      {
        path: 'marketing-campaign',
        element: <Outlet />,
        children: [
          { path: 'list', element: <CampaignListPage /> },
          { path: 'create', element: <CampaignCreatePage /> },
          { path: 'edit/:uuid', element: <CampaignEditPage /> },
        ],
      },
      {
        path: 'item',
        element: <Outlet />,
        children: [
          { path: 'list', element: <ItemListPage /> },
          { path: 'create', element: <ItemCreatePage /> },
          { path: 'edit/:uuid', element: <ItemEditPage /> },
        ],
      },
      {
        path: 'profile',
        element: <Outlet />,
        children: [
          { path: '', element: <ProfileDetailPage /> },
          { path: 'edit/:uuid', element: <ProfileEditPage /> },
        ],
      },
      {
        path: 'store',
        element: <Outlet />,
        children: [
          { path: '', element: <StoreDetailPage /> },
          { path: 'edit/:uuid', element: <StoreEditPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
      { path: '', element: <ProductListPage /> },
    ],
  },
  {
    path: '*',
    element: !isAuthenticated ? (
      <Navigate to="/auth/login" />
    ) : (
      <Navigate to={`/${storeUrl}`} />
    ),
  },
];

export default Routes;
