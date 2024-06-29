import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { RoleEditView } from 'src/sections/roles/view/roles-edit';
import { useGetRole } from 'src/actions/roles';
import { MotionLazy } from 'src/components/animate/motion-lazy';

// ----------------------------------------------------------------------

const metadata = { title: `Role Edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  console.log(id, 'PARAM');
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
