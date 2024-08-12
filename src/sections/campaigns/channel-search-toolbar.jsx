import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

export function ChannelSearchToolbar({ url, handleUrlChange, handleSearch }) {
  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      <TextField
        label="Channel URL or Name"
        fullWidth
        value={url}
        onChange={handleUrlChange}
        placeholder="Enter Channel URL or Name..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      <Button
        // component={RouterLink}
        // href={paths.dashboard.users.createUser}
        onClick={handleSearch}
        variant="contained"
        endIcon={<Iconify icon="dashicons:search" />}
      >
        Search
      </Button>
    </Stack>
  );
}
