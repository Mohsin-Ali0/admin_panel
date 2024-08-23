import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function UserTableRow({ row, selected, onEditRow, onUpdateStatusRow, canEdit }) {
  const confirm = useBoolean();
  const popover = usePopover();

  const quickEdit = useBoolean();
  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row.username} src={row.user_image} />

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={onEditRow} sx={{ cursor: 'pointer' }}>
                {row.username}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.user_email}
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.user_status === true && 'success') ||
              (row.user_status === false && 'error') ||
              'default'
            }
          >
            {row.user_status === true ? 'Active' : 'InActive'}
          </Label>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.role_id?.role_name}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {row?.updatedBy?.first_name && row?.updatedBy?.last_name
            ? `${row?.updatedBy?.first_name} ${row?.updatedBy?.last_name}`
            : 'Not Updated Yet'}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Edit User" placement="top" arrow>
              <IconButton
                color={quickEdit.value ? 'inherit' : 'default'}
                onClick={() => {
                  onEditRow();
                  quickEdit.onTrue;
                }}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>

            {canEdit && (
              <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            )}
          </Stack>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'warning.main' }}
          >
            <Iconify icon="solar:key-linear" />
            Update Status
          </MenuItem>

          <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Update User Status"
        content="Are you sure want to Update the User Status?"
        action={
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              onUpdateStatusRow(row);
              confirm.onFalse();
            }}
          >
            Update
          </Button>
        }
      />
    </>
  );
}
