import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetcustomer } from 'src/actions/customers';

import { LoadingScreen } from 'src/components/loading-screen';

import { CustomerDetailsView } from 'src/sections/customers/view';

// ----------------------------------------------------------------------

const metadata = { title: `Customer details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const { customer, customerLoading, customerError, customerValidating } = useGetcustomer(id);
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      {customerLoading ? <LoadingScreen /> : <CustomerDetailsView customer={customer} />}
    </>
  );
}
