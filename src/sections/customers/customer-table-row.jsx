import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

// CHANGE VALUES TO YOUR OWN API VALUES AND MAKE UESR SIGN IN API CHANGES

export function CustomerTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();

  const collapse = useBoolean();

  const popover = usePopover();

  const successfulPayments = row?.paymentIntents.map((detail) => {
    let parsedCampaignDetails;
    parsedCampaignDetails = detail?.campaign_details ? JSON.parse(detail?.campaign_details) : null;
    return {
      ...detail,
      parsedCampaignDetails,
    };
  });
  const flatSuccessfulPayments = successfulPayments.flat();
  const successfulPaymentsCount = flatSuccessfulPayments.filter(
    (intent) => intent.payment_status === 'Success'
  ).length;

  const totalSuccessfulPaymentsAmount = successfulPayments.reduce((totalAmount, intent) => {
    const amount = intent.parsedCampaignDetails?.value || 0;
    return totalAmount + amount;
  }, 0);

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar alt={row?.first_name} src={row?.user_image} />

          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">
              <Link color="inherit" onClick={onViewRow} sx={{ cursor: 'pointer' }}>
                {row?.first_name} {row?.last_name}
              </Link>
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row?.email}
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <ListItemText
          primary={fDate(row?.createdAt ? row?.createdAt : Date.now())}
          secondary={fTime(row?.createdAt ? row?.createdAt : Date.now())}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell align="center"> {successfulPaymentsCount} </TableCell>
      <TableCell align="center"> {fCurrency(totalSuccessfulPaymentsAmount)}</TableCell>

      {successfulPayments.length > 0 ? (
        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton
            color={collapse.value ? 'inherit' : 'default'}
            onClick={collapse.onToggle}
            sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
          >
            <Iconify icon="eva:arrow-ios-downward-fill" />
          </IconButton>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      ) : (
        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }} />
      )}
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Paper sx={{ m: 1.5 }}>
            {successfulPayments?.map((item) => (
              <Stack
                key={item._id}
                direction="row"
                alignItems="center"
                sx={{
                  p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                  },
                }}
              >
                <Avatar
                  src={item?.parsedCampaignDetails?.ChannelDetails?.thumbnail}
                  variant="rounded"
                  sx={{ width: 48, height: 48, mr: 2 }}
                />

                <ListItemText
                  primary={
                    <Link color="inherit" onClick={onViewRow} sx={{ cursor: 'pointer' }}>
                      {item?.parsedCampaignDetails?.ChannelDetails?.title}
                    </Link>
                  }
                  secondary={`${item?.parsedCampaignDetails?.ChannelDetails?.subscribersCount} Subscribers`}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                    mt: 0.5,
                  }}
                />

                <Box sx={{ width: 110, textAlign: 'right' }}>
                  No of Videos: {item?.parsedCampaignDetails?.Videos.length}
                </Box>
                <Box sx={{ width: 110, textAlign: 'right' }}>
                  {fCurrency(item.parsedCampaignDetails.value)}
                </Box>
              </Stack>
            ))}
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      {renderSecondary}

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              onViewRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
