import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export function CustomerDetailsItems({
  taxes,
  shipping,
  discount,
  subtotal,
  items = [],
  totalAmount,
}) {
  const ParsedIntentDetails = items.map((detail) => {
    let parsedCampaignDetails;
    parsedCampaignDetails = detail?.campaign_details ? JSON.parse(detail?.campaign_details) : null;
    return {
      ...detail,
      parsedCampaignDetails,
    };
  });
  const flatSuccessfulPayments = ParsedIntentDetails.flat();
  const successfulPaymentsCount = flatSuccessfulPayments.filter(
    (intent) => intent.payment_status === 'Success'
  ).length;

  const totalSuccessfulPaymentsAmount = ParsedIntentDetails.reduce((totalAmount, intent) => {
    const amount = intent.parsedCampaignDetails?.value || 0;
    return totalAmount + amount;
  }, 0);

  const renderTotal = (
    <Stack spacing={2} alignItems="flex-end" sx={{ p: 3, textAlign: 'right', typography: 'body2' }}>
      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Total</div>
        <Box sx={{ width: 160 }}>{fCurrency(totalSuccessfulPaymentsAmount) || '-'}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Card>
      <CardHeader
        title="Campaigns Overview"
        // action={
        //   <IconButton>
        //     <Iconify icon="solar:pen-bold" />
        //   </IconButton>
        // }
      />

      <Scrollbar>
        {ParsedIntentDetails.map((item) => (
          <Stack
            key={item?.payment_id}
            direction="row"
            alignItems="center"
            sx={{
              p: 3,
              minWidth: 640,
              borderBottom: (theme) => `dashed 2px ${theme.vars.palette.background.neutral}`,
            }}
          >
            <Avatar
              src={item?.parsedCampaignDetails?.ChannelDetails?.thumbnail}
              variant="rounded"
              sx={{ width: 48, height: 48, mr: 2 }}
            />

            <ListItemText
              primary={item?.parsedCampaignDetails?.ChannelDetails?.title}
              secondary={`No of Videos:` + ` ${item?.parsedCampaignDetails?.Videos?.length}`}
              primaryTypographyProps={{ typography: 'body2' }}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
                mt: 0.5,
              }}
            />
            <Label
              variant="soft"
              color={
                (new Date(item.campaign_end_date) < new Date() && 'success') ||
                (new Date(item.campaign_end_date) >= new Date() && 'warning') ||
                'error'
              }
            >
              {/* {row.status} */}
              {(new Date(item.campaign_end_date) < new Date() && 'Completed') ||
                (new Date(item.campaign_end_date) >= new Date() && 'In Progress') ||
                (item.campaign_end_date < new Date() && 'Stopped')}
            </Label>

            <Box sx={{ width: 300, textAlign: 'right', typography: 'subtitle2' }}>
              Campaign End Date: {fDate(item.campaign_end_date)}
            </Box>
            <Box sx={{ width: 110, textAlign: 'right', typography: 'subtitle2' }}>
              {fCurrency(item?.amount)}
            </Box>
          </Stack>
        ))}
      </Scrollbar>

      {renderTotal}
    </Card>
  );
}
