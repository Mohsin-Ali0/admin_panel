import { Outlet } from 'react-router-dom';
import { lazy, Suspense, useContext } from 'react';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { jwtDecode } from 'src/auth/context/jwt';
import { AuthGuard, AccessDenied } from 'src/auth/guard';
import { AuthContext } from 'src/auth/context/auth-context';

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

// System Managment

const TermsAndConditionManagmentPage = lazy(
  () => import('src/pages/dashboard/system-managment/terms-and-condition-managment')
);
const PrivacyAndPolicyManagmentPage = lazy(
  () => import('src/pages/dashboard/system-managment/privace-policy-managment')
);
const SystemConfigurationManagmentPage = lazy(
  () => import('src/pages/dashboard/system-managment/system-configuration-managment')
);

// const CustomerEditPage = lazy(() => import('src/pages/dashboard/customers/edit-customer'));
// campaigns
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
export const ProtectedRoute = ({ children, permission }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />; // Show loading screen while checking permissions
  }
  const permissions = jwtDecode(user.accessToken).AllowedScreens;

  if (!permissions) {
    return <LoadingScreen />;
  }

  if (!permissions[permission]?.view) {
    return <AccessDenied />; // Redirect to a "Not Authorized" page or show a message
  }

  return children;
};
export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        path: 'roles',
        children: [
          {
            element: (
              <ProtectedRoute permission="roles">
                <RolesListPage />
              </ProtectedRoute>
            ),
            index: true,
          },
          {
            path: 'list',
            element: (
              <ProtectedRoute permission="roles">
                <RolesListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'create-role',
            element: (
              <ProtectedRoute permission="roles">
                <CreateRolePage />
              </ProtectedRoute>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <ProtectedRoute permission="roles">
                <RoleEditPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            element: (
              <ProtectedRoute permission="users">
                <UsersListPage />
              </ProtectedRoute>
            ),
            index: true,
          },
          {
            path: 'create-user',
            element: (
              <ProtectedRoute permission="users">
                <CreateUserPage />
              </ProtectedRoute>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <ProtectedRoute permission="users">
                <UserEditPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'customers',
        children: [
          {
            element: (
              <ProtectedRoute permission="campaigns">
                <CustomersListPage />
              </ProtectedRoute>
            ),
            index: true,
          },
          {
            path: 'list',
            element: (
              <ProtectedRoute permission="users">
                <CustomersListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'create-customer',
            element: (
              <ProtectedRoute permission="users">
                <CreateCustomerPage />
              </ProtectedRoute>
            ),
          },
          {
            path: ':id/details',
            element: (
              <ProtectedRoute permission="users">
                <CustomerDetailsPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'custom-campaigns',
        children: [
          {
            element: (
              <ProtectedRoute permission="customcampaigns">
                <CreateCampaignPage />
              </ProtectedRoute>
            ),
            index: true,
          },
          {
            path: 'create-campaign',
            element: (
              <ProtectedRoute permission="customcampaigns">
                <CreateCampaignPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'system-managment',
        children: [
          {
            element: (
              <ProtectedRoute permission="systemconfiguration">
                <SystemConfigurationManagmentPage />
              </ProtectedRoute>
            ),
            index: true,
          },
          {
            path: 'terms-and-condition-managment',
            element: (
              <ProtectedRoute permission="systemconfiguration">
                <TermsAndConditionManagmentPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'privacy-and-policy-managment',
            element: (
              <ProtectedRoute permission="systemconfiguration">
                <PrivacyAndPolicyManagmentPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'system-configuration',
            element: (
              <ProtectedRoute permission="systemconfiguration">
                <SystemConfigurationManagmentPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
];
