import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CreateCampaignView } from 'src/sections/campaigns/view/create-campagin';
import { useContext } from 'react';
import { AuthContext } from 'src/auth/context/auth-context';
import { jwtDecode } from 'src/auth/context/jwt';
// ----------------------------------------------------------------------

const metadata = { title: `Create Campaign | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { user } = useContext(AuthContext);
  let permissions = jwtDecode(user?.accessToken)?.AllowedScreens;
  let canEdit = permissions.customcampaigns.edit;
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CreateCampaignView title="Create Campaign" canEdit={canEdit} />
    </>
  );
}
