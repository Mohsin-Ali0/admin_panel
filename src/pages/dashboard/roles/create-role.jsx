import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { CreateRoleView } from 'src/sections/roles/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create Role | Dashboard - ${CONFIG.site.name}` };

export default function CreatRole() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CreateRoleView title="Create Role" />
    </>
  );
}
