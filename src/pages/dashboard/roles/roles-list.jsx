import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { RoleListView } from 'src/sections/roles/view';

// ----------------------------------------------------------------------

const metadata = { title: `Roles List | Dashboard - ${CONFIG.site.name}` };

export default function RolesList() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <RoleListView title="Create Role" />
    </>
  );
}
