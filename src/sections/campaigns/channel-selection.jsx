import { m } from 'framer-motion';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { endpoints } from 'src/utils/axios';

import { useChannels } from 'src/actions/custom-campaigns';
import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { Scrollbar } from 'src/components/scrollbar';
import { LoadingScreen } from 'src/components/loading-screen';
import { varBounce, MotionContainer } from 'src/components/animate';

import { ChannelItem } from './channel-item';
import { ChannelSearchToolbar } from './channel-search-toolbar';

export function ChannelSelection({ campagineData, updateCampaignData }) {
  const { fetchChannels, loading, error } = useChannels();
  const handleChannelClick = useCallback(
    (channel) => {
      updateCampaignData('channel', {
        selectedChannel: channel,
      });
    },
    [updateCampaignData]
  );

  const handleUrlChange = useCallback(
    (e) => {
      updateCampaignData('channel', {
        url: e.target.value,
      });
    },
    [updateCampaignData]
  );

  const searchChannels = useCallback(async () => {
    if (campagineData.url === '') {
      return;
    }
    const channels = await fetchChannels(endpoints.customCampaigns.getchannels, campagineData.url);
    updateCampaignData('channel', { ChannelsList: channels, selectedChannel: null });
    updateCampaignData('videos', {
      selectedVideos: [],
      VideosList: [],
      url: '',
    });
  }, [campagineData]);

  const isSelected = (channel) => campagineData?.selectedChannel?.channelId === channel?.channelId;

  const renderLoading = (
    <Box sx={{ p: 5 }}>
      <LoadingScreen />
    </Box>
  );

  const renderError = (
    <Box sx={{ p: 5 }} textAlign="center">
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
        url={campagineData.url}
        handleUrlChange={handleUrlChange}
        handleSearch={searchChannels}
      />
      {loading && renderLoading}
      {error && renderError}

      <Scrollbar>
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        >
          {/* {!loading && campagineData?.ChannelsList?.length === 0 && <div>No channels found</div>} */}
          {campagineData?.ChannelsList?.map((row, index) => (
            <ChannelItem
              key={index}
              row={row}
              isSelected={isSelected(row)}
              onClick={() => handleChannelClick(row)}
            />
          ))}
        </Box>
      </Scrollbar>
    </>
  );
}
