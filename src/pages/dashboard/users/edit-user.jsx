import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetUser } from 'src/actions/user';

import { MotionLazy } from 'src/components/animate/motion-lazy';

import { UserEditView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `User Edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const { user, userLoading, userError, userValidating } = useGetUser(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      {userLoading ? (
        <MotionLazy /> // Or any other loading indicator
      ) : (
        <UserEditView currentUser={user} />
      )}
    </>
  );
}
