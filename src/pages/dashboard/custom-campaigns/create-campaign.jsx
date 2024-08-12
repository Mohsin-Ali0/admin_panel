import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CreateCampaignView } from 'src/sections/campaigns/view/create-campagin';

// ----------------------------------------------------------------------

const metadata = { title: `Create Campaign | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CreateCampaignView title="Create Campaign" />
    </>
  );
}
