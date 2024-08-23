import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserListView } from 'src/sections/user/view';

import { jwtDecode } from 'src/auth/context/jwt';
import { AuthContext } from 'src/auth/context/auth-context';
// ----------------------------------------------------------------------

const metadata = { title: `User List | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { user } = useContext(AuthContext);
  const permissions = jwtDecode(user?.accessToken)?.AllowedScreens;
  const canEdit = permissions.users.edit;
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserListView title="Users List" canEdit={canEdit} />
    </>
  );
}
