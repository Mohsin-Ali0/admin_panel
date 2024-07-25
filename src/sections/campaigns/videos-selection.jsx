import { useCallback, useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { AutoSelectedVideos } from './auto-select-videos';
import { ManuallySelectVideos } from './manual-select-videos';
import { useGetvideos } from 'src/actions/custom-campaigns';
import { LoadingScreen } from 'src/components/loading-screen';
import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

export function VideoSelection({ channelId, campagineData, updateCampaignData }) {
  const [selectedValue, setSelectedValue] = useState(1);
  const { videos, videosLoading, videosError, videosValidating } = useGetvideos(
    channelId,
    selectedValue,
    campagineData.url
  );

  useEffect(() => {
    if (videos) {
      if (selectedValue === 1 || selectedValue === 2) {
        // Only update if there's a change in the data
        updateCampaignData('videos', { selectedVideos: videos });
      } else if (selectedValue === 3) {
        updateCampaignData('videos', { selectedVideos: [], VideosList: videos });
      }
    }
  }, [videos]);

  const handleChange = useCallback((event) => {
    setSelectedValue(parseInt(event.target.value));
  }, []);

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
    switch (selectedValue) {
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
  }, [selectedValue, campagineData, updateCampaignData]);

  return (
    <>
      <RadioGroup defaultValue={1} value={selectedValue} onChange={handleChange}>
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
