import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));
// roles
const CreateRolePage = lazy(() => import('src/pages/dashboard/roles/create-role'));
const RolesListPage = lazy(() => import('src/pages/dashboard/roles/roles-list'));
const RoleEditPage = lazy(() => import('src/pages/dashboard/roles/edit-role'));
// users
const CreateUserPage = lazy(() => import('src/pages/dashboard/users/create-user'));
const UsersListPage = lazy(() => import('src/pages/dashboard/users/list-user'));
const UserEditPage = lazy(() => import('src/pages/dashboard/users/edit-user'));

// customers
const CreateCustomerPage = lazy(() => import('src/pages/dashboard/customers/create-customer'));
const CustomersListPage = lazy(() => import('src/pages/dashboard/customers/list-customer'));
const CustomerDetailsPage = lazy(() => import('src/pages/dashboard/customers/details-customer'));

// const CustomerEditPage = lazy(() => import('src/pages/dashboard/customers/edit-customer'));
//campaigns
const CreateCampaignPage = lazy(
  () => import('src/pages/dashboard/custom-campaigns/create-campaign')
);

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
      {
        path: 'roles',
        children: [
          { element: <RolesListPage />, index: true },
          { path: 'list', element: <RolesListPage /> },
          { path: 'create-role', element: <CreateRolePage /> },
          { path: ':id/edit', element: <RoleEditPage /> },
        ],
      },
      {
        path: 'users',
        children: [
          { element: <UsersListPage />, index: true },
          { path: 'list', element: <UsersListPage /> },
          { path: 'create-user', element: <CreateUserPage /> },
          { path: ':id/edit', element: <UserEditPage /> },
        ],
      },
      {
        path: 'customers',
        children: [
          { element: <CustomersListPage />, index: true },
          { path: 'list', element: <CustomersListPage /> },
          { path: 'create-customer', element: <CreateCustomerPage /> },
          { path: ':id/details', element: <CustomerDetailsPage /> },
        ],
      },
      {
        path: 'custom-campaigns',
        children: [
          { element: <CreateCampaignPage />, index: true },
          { path: 'create-campaign', element: <CreateCampaignPage /> },
        ],
      },
    ],
  },
];
