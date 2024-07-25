import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { decodeGoogleSpecialCharacters } from 'src/utils/decode-google-characters';
import { ChannelSearchToolbar } from './channel-search-toolbar';
import { useCallback, useState } from 'react';
import { endpoints } from 'src/utils/axios';
import { useManualVideos } from 'src/actions/custom-campaigns';
import { LoadingScreen } from 'src/components/loading-screen';
import { m } from 'framer-motion';

import Container from '@mui/material/Container';

import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
export const ManuallySelectVideos = ({ campagineData, updateCampaignData, channelId }) => {
  const [searchUrl, setSearchUrl] = useState(campagineData.url); // Separate state for search URL
  const { fetchVideos, loading, error } = useManualVideos();
  console.log(loading, error, 'loading, error');
  const handleVideoClick = useCallback(
    (video) => {
      const isAlreadySelected = campagineData.selectedVideos.find(
        (v) => v.videoId === video.videoId
      );

      if (isAlreadySelected) {
        updateCampaignData('videos', {
          selectedVideos: campagineData.selectedVideos.filter((v) => v.videoId !== video.videoId),
        });
      } else {
        updateCampaignData('videos', {
          selectedVideos: [...campagineData.selectedVideos, video],
        });
      }
    },
    [campagineData.selectedVideos, updateCampaignData]
  );

  const handleUrlChange = useCallback((e) => {
    setSearchUrl(e.target.value); // Update local state for URL
  }, []);

  const getVideoIdFromUrl = (url) => {
    if (!url.startsWith('https://www.youtube.com/watch?v=')) {
      return null; // Not a valid YouTube video URL
    }
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  };

  const searchVideos = useCallback(async () => {
    const isUrl = searchUrl.startsWith('https://www.youtube.com/watch?v=');

    // If it's a URL, extract the video ID
    const videoId = isUrl ? getVideoIdFromUrl(searchUrl) : null;

    const VideosList = await fetchVideos(endpoints.customCampaigns.getvideos, {
      channelId,
      type: 4,
      SearchBody: {
        keyword: isUrl ? null : searchUrl,
        videoId: isUrl ? videoId : null,
      },
    });
    console.log(VideosList, 'VideosList');
    updateCampaignData('videos', {
      VideosList: VideosList,
      url: '',
    });
    // const videos = await axios.post(endpoints.customCampaigns.getvideos, {
    //   channelId,
    //   type: 4,
    //   SearchBody: {
    //     keyword: isUrl ? null : SearchVideoValue.url,
    //     videoId: isUrl ? videoId : null,
    //   },
    // });
    // updateCampaignData('videos', { VideosList: [] });
  }, [searchUrl, updateCampaignData]);

  const handleRemoveVideo = useCallback(
    (videoId) => {
      updateCampaignData('videos', {
        selectedVideos: campagineData.selectedVideos.filter((v) => v.videoId !== videoId),
      });
    },
    [campagineData.selectedVideos, updateCampaignData]
  );

  const isSelected = (video) =>
    campagineData?.selectedVideos.some((v) => v.videoId === video.videoId);

  const renderLoading = (
    <Box sx={{ p: 5 }}>
      <LoadingScreen />
    </Box>
  );

  const renderError = (
    <Box sx={{ p: 5 }} textAlign={'center'}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {error}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    </Box>
  );

  return (
    <>
      <ChannelSearchToolbar
        // url={campagineData.url}
        // handleUrlChange={handleUrlChange}
        // handleSearch={searchVideos}
        url={searchUrl} // Use local URL state
        handleUrlChange={handleUrlChange}
        handleSearch={searchVideos} // Trigger search on button click
      />
      {loading && renderLoading}
      {error && renderError}
      <Box
        gap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
      >
        {campagineData.VideosList?.map((row, index) => (
          <ManualSelection
            key={index}
            row={row}
            isSelected={isSelected(row)}
            onClick={() => handleVideoClick(row)}
          />
        ))}
      </Box>
      <Divider sx={{ borderStyle: 'dashed', p: 5 }} />

      <Box mt={4}>
        <Typography variant="h6">Selected Videos:</Typography>
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          mt={2}
        >
          {campagineData.selectedVideos.map((video) => (
            <Card key={video.videoId} sx={{ position: 'relative' }}>
              <Button
                onClick={() => handleRemoveVideo(video.videoId)}
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                Remove
              </Button>

              <Stack sx={{ p: 3, pb: 0 }} alignItems={'center'} textAlign={'center'}>
                <Avatar
                  alt={video.title}
                  src={video.thumbnail}
                  variant="rounded"
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Stack>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <Stack sx={{ p: 3, pb: 2 }} alignItems={'center'} textAlign={'center'}>
                <Typography variant="button" sx={{ color: 'text.primary' }}>
                  {decodeGoogleSpecialCharacters(video.title)}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

const ManualSelection = ({ row, isSelected, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(row);
  }, [onClick, row]);

  return (
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
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />
      <Stack sx={{ p: 3, pb: 2 }} alignItems={'center'} textAlign={'center'}>
        <Typography variant="button" sx={{ color: 'text.primary' }}>
          {decodeGoogleSpecialCharacters(row.title)}
        </Typography>
      </Stack>
    </Card>
  );
};
