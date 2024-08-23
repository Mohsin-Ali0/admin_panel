import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;
const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  email: icon('ic-email'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'Roles Managment',
        path: paths.dashboard.roles.root,
        icon: ICONS.lock,
        children: [
          { title: 'All Roles', path: paths.dashboard.roles.root },
          { title: 'Create Roles', path: paths.dashboard.roles.createRole },
        ],
      },
      {
        title: 'User Managment',
        path: paths.dashboard.users.root,
        icon: ICONS.user,
        children: [
          { title: 'All users', path: paths.dashboard.users.root },
          { title: 'Create users', path: paths.dashboard.users.createUser },
        ],
      },
      {
        title: 'Customer Managment',
        path: paths.dashboard.customers.root,
        icon: ICONS.user,
        children: [
          { title: 'All customers', path: paths.dashboard.customers.root },
          { title: 'Create customers', path: paths.dashboard.customers.createCustomer },
        ],
      },
      {
        title: 'Custom Campaigns',
        path: paths.dashboard.customCampaigns.root,
        icon: ICONS.user,
        children: [
          { title: 'Create Campaigns', path: paths.dashboard.customCampaigns.createCampaign },
        ],
      },
      {
        title: 'System-Managment',
        path: paths.dashboard.configuration.root,
        icon: ICONS.lock,
        children: [
          { title: 'Pricvacy Policy Managment', path: paths.dashboard.configuration.privacyPolicy },
          {
            title: 'Terms and Services Managment',
            path: paths.dashboard.configuration.termsandServices,
          },
          {
            title: 'System Configuration Managment',
            path: paths.dashboard.configuration.systemConfiguration,
          },
        ],
      },
    ],
  },
];
