import { CopyToClipboard } from 'src/components/copy-to-clipboard/copy-to-clipboard';

export function PaymentLinkScreen({ paymentLink }) {
  return (
    <div>
      <h1>Payment Link Screen</h1>
      <CopyToClipboard LinkUrl={paymentLink} title="Payment Link" />
    </div>
  );
}
