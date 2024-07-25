import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';

export function ChannelItem({ row, isSelected, onClick }) {
  const handleClick = useCallback(() => {
    onClick(row);
  }, [onClick, row]);
  return (
    <>
      <Card
        selected={isSelected}
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          backgroundColor: isSelected ? 'primary.main' : 'background.paper',
          '&:hover': {
            backgroundColor: isSelected ? 'primary.main' : 'action.hover',
          },
        }}
      >
        <Stack sx={{ p: 3, pb: 0 }} alignItems={'center'} textAlign={'center'}>
          <Avatar
            alt={row.title}
            src={row.thumbnail}
            variant="rounded"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack sx={{ p: 3, pb: 2 }} alignItems={'center'} textAlign={'center'}>
          <Typography variant="button" sx={{ color: 'text.primary' }}>
            {row.title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.primary' }}>
            {row.subscribersCount} Subscribers
          </Typography>
        </Stack>
      </Card>
    </>
  );
}
