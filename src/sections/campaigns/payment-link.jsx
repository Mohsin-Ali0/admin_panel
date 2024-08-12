import { Typography } from '@mui/material';
import { CopyToClipboard } from 'src/components/copy-to-clipboard/copy-to-clipboard';
import { LoadingScreen } from 'src/components/loading-screen';

export function PaymentLinkScreen({ paymentLink }) {
  return (
    <div>
      <h1>Payment Link Screen</h1>
      <CopyToClipboard LinkUrl={paymentLink} title={'Payment Link'} />
    </div>
  );
}
