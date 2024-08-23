import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserListView } from 'src/sections/user/view';
import { useContext } from 'react';
import { AuthContext } from 'src/auth/context/auth-context';
import { jwtDecode } from 'src/auth/context/jwt';
// ----------------------------------------------------------------------

const metadata = { title: `User List | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { user } = useContext(AuthContext);
  let permissions = jwtDecode(user?.accessToken)?.AllowedScreens;
  let canEdit = permissions.users.edit;
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserListView title="Users List" canEdit={canEdit} />
    </>
  );
}
