import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';

import { CONFIG } from 'src/config-global';
import { useTabs } from 'src/hooks/use-tabs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';

import { FrontViewsandPricing } from 'src/sections/system-configuration/front-views-managment';
import { PanelConfigManagment } from 'src/sections/system-configuration/panel-configuration-managment';
import { useContext } from 'react';
import { AuthContext } from 'src/auth/context/auth-context';
import { jwtDecode } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `System Configuration | Dashboard - ${CONFIG.site.name}` };

const TABS = [
  {
    value: 'frontmanagment',
    label: 'Front Views and Pricing Management',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'panelmanagment',
    label: 'Admin Panel Managment',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
];

export default function Page() {
  const tabs = useTabs('frontmanagment');
  const { user } = useContext(AuthContext);
  let permissions = jwtDecode(user?.accessToken)?.AllowedScreens;
  const canEdit = permissions.systemconfiguration.edit;
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="System Configuration Managment"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'System Configs', href: paths.dashboard.configuration.systemConfiguration },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>
        {tabs.value === 'frontmanagment' && (
          <FrontViewsandPricing
            title="Front Views and Pricing Management"
            contentType="FrontViewsPricingManagement"
            canEdit={canEdit}
          />
        )}
        {tabs.value === 'panelmanagment' && (
          <PanelConfigManagment
            title="Panel Campaign Management"
            contentType="PanelManagement"
            canEdit={canEdit}
          />
        )}
      </DashboardContent>
    </>
  );
}
