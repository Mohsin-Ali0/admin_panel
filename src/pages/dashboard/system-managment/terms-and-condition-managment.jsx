import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetContent } from 'src/actions/configuration';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ContentEditForm } from 'src/sections/system-configuration/content-editor-form';

import { jwtDecode } from 'src/auth/context/jwt';
import { AuthContext } from 'src/auth/context/auth-context';

// ----------------------------------------------------------------------

const metadata = { title: `Terms and Conditions Managment | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { content, contentLoading, contentError, contentValidating } =
    useGetContent('termsAndConditions');

  const { user } = useContext(AuthContext);
  const permissions = jwtDecode(user?.accessToken)?.AllowedScreens;
  const canEdit = permissions.systemconfiguration.edit;
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent>
        <CustomBreadcrumbs
          heading="Terms and Conditions Managment"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Terms and Conditions', href: paths.dashboard.configuration.termsandServices },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <ContentEditForm title="Terms and Conditions" contentData={content} canEdit={canEdit} />
      </DashboardContent>
    </>
  );
}
