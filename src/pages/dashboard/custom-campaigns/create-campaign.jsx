import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CreateCampaignView } from 'src/sections/campaigns/view/create-campagin';

import { jwtDecode } from 'src/auth/context/jwt';
import { AuthContext } from 'src/auth/context/auth-context';
// ----------------------------------------------------------------------

const metadata = { title: `Create Campaign | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { user } = useContext(AuthContext);
  const permissions = jwtDecode(user?.accessToken)?.AllowedScreens;
  const canEdit = permissions.customcampaigns.edit;
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CreateCampaignView title="Create Campaign" canEdit={canEdit} />
    </>
  );
}
