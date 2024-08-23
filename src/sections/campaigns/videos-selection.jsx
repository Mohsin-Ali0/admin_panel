import { m } from 'framer-motion';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Container from '@mui/material/Container';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useGetvideos } from 'src/actions/custom-campaigns';
import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { LoadingScreen } from 'src/components/loading-screen';
import { varBounce, MotionContainer } from 'src/components/animate';

import { AutoSelectedVideos } from './auto-select-videos';
import { ManuallySelectVideos } from './manual-select-videos';

export function VideoSelection({ channelId, campagineData, updateCampaignData }) {
  const { videos, videosLoading, videosError, videosValidating } = useGetvideos(
    channelId,
    campagineData?.selectedType,
    campagineData.url
  );

  useEffect(() => {
    if (videos) {
      if (campagineData?.selectedType === 1 || campagineData?.selectedType === 2) {
        // Only update if there's a change in the data
        updateCampaignData('videos', { selectedVideos: videos, ManualSelected: false });
      } else if (campagineData?.selectedType === 3) {
        updateCampaignData('videos', {
          selectedVideos: [],
          VideosList: videos,
          ManualSelected: true,
        });
      }
    }
  }, [videos]);

  const handleChange = useCallback((event) => {
    updateCampaignData('videos', { selectedType: parseInt(event.target.value) });
  }, []);

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
            {videosError}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    </Box>
  );

  const renderChildComponent = useMemo(() => {
    switch (campagineData?.selectedType) {
      case 1:
        return <AutoSelectedVideos selectedVideos={campagineData.selectedVideos} />;
      case 2:
        return <AutoSelectedVideos selectedVideos={campagineData.selectedVideos} />;
      case 3:
        return (
          <ManuallySelectVideos
            campagineData={campagineData}
            updateCampaignData={updateCampaignData}
            channelId={channelId}
          />
        );
      default:
        return null;
    }
  }, [campagineData, updateCampaignData]);

  return (
    <>
      <RadioGroup defaultValue={1} value={campagineData?.selectedType} onChange={handleChange}>
        <FormControlLabel
          value={1}
          control={<Radio size="medium" />}
          label="Automatically select the Relevent Videos"
        />
        <FormControlLabel
          value={2}
          control={<Radio size="medium" />}
          label="Automatically select the most recent videos"
        />
        <FormControlLabel
          value={3}
          control={<Radio size="medium" />}
          label="Select the videos Manually"
        />
      </RadioGroup>

      <Box sx={{ mt: 5 }}>{videosLoading && renderLoading}</Box>
      <Box sx={{ mt: 5 }}>{videosError && renderError}</Box>
      <Box sx={{ mt: 5 }}>{renderChildComponent}</Box>
    </>
  );
}
