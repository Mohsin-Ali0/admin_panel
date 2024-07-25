import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { CustomerListView } from 'src/sections/customers/view';

// ----------------------------------------------------------------------

const metadata = { title: `Customers List | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CustomerListView title="Customers List" />
    </>
  );
}
