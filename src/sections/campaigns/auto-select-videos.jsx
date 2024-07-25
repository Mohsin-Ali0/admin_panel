import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { decodeGoogleSpecialCharacters } from 'src/utils/decode-google-characters';

export const AutoSelectedVideos = ({ selectedVideos }) => {
  console.log(selectedVideos, 'selectedVideos');
  return (
    <>
      <Box gap={2} display="grid" gridTemplateColumns="1fr">
        {selectedVideos?.map((row, index) => (
          <VideosList key={index} row={row} />
        ))}
      </Box>
    </>
  );
};

export const VideosList = ({ row }) => {
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Stack sx={{ flexDirection: 'row' }} alignItems={'center'} textAlign={'center'}>
          <Avatar
            alt={row.title}
            src={row.thumbnail}
            variant="rounded"
            sx={{
              width: 80,
              height: 80,
              objectFit: 'cover', // Ensure the image covers the Avatar without cropping
              objectPosition: 'center', // Center the image
            }}
          />
          <Typography variant="button" sx={{ color: 'text.primary', pl: 3 }}>
            {decodeGoogleSpecialCharacters(row.title)}
          </Typography>
        </Stack>
      </Card>
    </>
  );
};
