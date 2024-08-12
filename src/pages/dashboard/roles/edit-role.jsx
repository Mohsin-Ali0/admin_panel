import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetRole } from 'src/actions/roles';

import { MotionLazy } from 'src/components/animate/motion-lazy';

import { RoleEditView } from 'src/sections/roles/view/roles-edit';

// import { UserEditView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `Role edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const { role, roleLoading } = useGetRole(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {roleLoading ? <MotionLazy /> : <RoleEditView role={role} />}
    </>
  );
}
