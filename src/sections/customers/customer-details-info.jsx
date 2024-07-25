import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function CustomerDetailsInfo({ customer }) {
  const renderCustomer = (
    <>
      <CardHeader title="Customer info" />
      <Stack direction="row" sx={{ p: 3 }}>
        <Avatar
          alt={customer?.username}
          src={customer?.user_image}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">
            {customer?.first_name} {customer?.last_name}
          </Typography>

          <Box sx={{ color: 'text.secondary' }}>{customer?.email}</Box>
        </Stack>
      </Stack>
    </>
  );

  // const renderDelivery = (
  //   <>
  //     <CardHeader
  //       title="Delivery"
  //       action={
  //         <IconButton>
  //           <Iconify icon="solar:pen-bold" />
  //         </IconButton>
  //       }
  //     />
  //     <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
  //       <Stack direction="row" alignItems="center">
  //         <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
  //           Ship by
  //         </Box>
  //         {delivery?.shipBy}
  //       </Stack>
  //       <Stack direction="row" alignItems="center">
  //         <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
  //           Speedy
  //         </Box>
  //         {delivery?.speedy}
  //       </Stack>
  //       <Stack direction="row" alignItems="center">
  //         <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
  //           Tracking No.
  //         </Box>
  //         <Link underline="always" color="inherit">
  //           {delivery?.trackingNumber}
  //         </Link>
  //       </Stack>
  //     </Stack>
  //   </>
  // );

  // const renderShipping = (
  //   <>
  //     <CardHeader
  //       title="Shipping"
  //       action={
  //         <IconButton>
  //           <Iconify icon="solar:pen-bold" />
  //         </IconButton>
  //       }
  //     />
  //     <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
  //       <Stack direction="row">
  //         <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
  //           Address
  //         </Box>
  //         {shippingAddress?.fullAddress}
  //       </Stack>

  //       <Stack direction="row">
  //         <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
  //           Phone number
  //         </Box>
  //         {shippingAddress?.phoneNumber}
  //       </Stack>
  //     </Stack>
  //   </>
  // );

  const renderPayment = (
    <>
      <CardHeader title="Card Details" />
      {customer.paymentMethods.map((item) => (
        <Item item={item} key={item.paymentMethodId} />
      ))}
    </>
  );
  // const renderPayment = (
  //   <>
  //     <CardHeader
  //       title="Payment"
  //       action={
  //         <IconButton>
  //           <Iconify icon="solar:pen-bold" />
  //         </IconButton>
  //       }
  //     />
  //     <Box
  //       display="flex"
  //       alignItems="center"
  //       justifyContent="flex-end"
  //       sx={{ p: 3, gap: 0.5, typography: 'body2' }}
  //     >
  //       456464564 {/* {payment?.cardNumber} */}
  //       <Iconify icon="logos:mastercard" width={24} />
  //     </Box>
  //   </>
  // );
  function Item({ item }) {
    const popover = usePopover();

    return (
      <>
        <Box sx={{ p: 3, width: 1 }}>
          <Box
            sx={{
              my: 3,
              gap: 1,
              display: 'flex',
              alignItems: 'center',
              typography: 'subtitle1',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                px: 0.75,
                bgcolor: 'white',
                borderRadius: 0.5,
                display: 'inline-flex',
              }}
            >
              {item.brand === 'mastercard' && <Iconify width={24} icon="logos:mastercard" />}
              {item.brand === 'visa' && <Iconify width={24} icon="logos:visa" />}
            </Box>
            ***** ***** ***** {item.last4}
          </Box>
          <Box sx={{ gap: 5, display: 'flex', typography: 'subtitle1' }}>
            <div>
              <Box sx={{ mb: 1, opacity: 0.48, typography: 'caption' }}>Expiration date</Box>
              <Box component="span">
                {item.expMonth}/{item.expYear ? item.expYear.toString().slice(-2) : ''}
              </Box>
            </div>
          </Box>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </>
    );
  }
  return (
    <Card>
      {renderCustomer}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* {renderDelivery} */}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* {renderShipping} */}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderPayment}
    </Card>
  );
}
