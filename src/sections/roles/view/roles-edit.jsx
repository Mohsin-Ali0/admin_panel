import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { RoleEditForm } from '../role-edit-form';

// ----------------------------------------------------------------------

export function RoleEditView({ role: currentRole }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Roles', href: paths.dashboard.roles.root },
          { name: currentRole?.role_name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RoleEditForm currentRole={currentRole} />
    </DashboardContent>
  );
}
