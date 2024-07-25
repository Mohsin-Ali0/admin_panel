import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import { Iconify } from 'src/components/iconify';

export function ChannelSearchToolbar({ url, handleUrlChange, searchChannels }) {
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
        onClick={searchChannels}
        variant="contained"
        endIcon={<Iconify icon="dashicons:search" />}
      >
        Search
      </Button>
    </Stack>
  );
}
