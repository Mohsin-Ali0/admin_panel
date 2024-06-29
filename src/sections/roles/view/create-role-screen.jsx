// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { RoleNewEditForm } from '../role-new-add-form';

// ----------------------------------------------------------------------

export function CreateRoleView() {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Create a new Role"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Roles', href: paths.dashboard.roles.root },
          { name: 'New Role' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <RoleNewEditForm />
    </DashboardContent>
  );
}
