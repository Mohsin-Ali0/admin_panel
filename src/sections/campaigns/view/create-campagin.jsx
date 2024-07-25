import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';
import { _userAbout, _userPlans, _userPayment, _userInvoices, _userAddressBook } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';

import { VideoSelection } from '../videos-selection';
import { AudienceSelection } from '../audience-intrest';
import { ChannelSelection } from '../channel-selection';
import { BudgetSelection } from '../budget-selection';
import { useCallback, useState } from 'react';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const steps = [
  'Select Channel',
  'Choose Videos to Promote',
  'Select Audience and Intrest',
  'Set Budget',
];

export function CreateCampaignView() {
  const [activeStep, setActiveStep] = useState(0);

  const [skipped, setSkipped] = useState(new Set());

  const [campagineData, setCampagineData] = useState({
    channel: {
      selectedChannel: null,
      ChannelsList: [],
      url: '',
    },
    videos: {
      selectedVideos: [],
      VideosList: [],
      url: '',
    },
    audience: {
      age: [],
      intrest: [],
      countries: [],
      tags: [],
    },
    budget: {
      amount: 0, //in cents
      currency: 'USD',
      percentage: 0,
    },
  });

  const isStepOptional = (step) => step === 2;

  const isStepSkipped = (step) => skipped.has(step);

  // Check if the current step is valid
  const isStepValid = (step) => {
    if (step === 0) {
      // Ensure a channel is selected for step 0
      return campagineData.channel.selectedChannel !== null;
    }
    return true; // Other steps do not have specific conditions for now
  };

  const handleNext = useCallback(() => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  }, [activeStep, skipped]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleSkip = useCallback(() => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }, [activeStep]);

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, []);

  const updateCampaignData = useCallback((key, value) => {
    setCampagineData((prevData) => ({
      ...prevData,
      [key]: {
        ...prevData[key],
        ...value,
      },
    }));
  }, []);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Campaign"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Create Campaigns' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Paper
            sx={{
              p: 3,
              my: 3,
              minHeight: 120,
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
            }}
          >
            <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
          </Paper>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Paper
            sx={{
              p: 3,
              my: 3,
              minHeight: 120,
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
            }}
          >
            {activeStep === 0 && (
              <ChannelSelection
                campagineData={campagineData.channel}
                updateCampaignData={updateCampaignData}
              />
            )}
            {activeStep === 1 && (
              <VideoSelection
                channelId={campagineData.channel.selectedChannel?.channelId}
                campagineData={campagineData.videos}
                updateCampaignData={updateCampaignData}
              />
            )}
            {activeStep === 2 && (
              <AudienceSelection
                campagineData={campagineData.audience}
                updateCampaignData={updateCampaignData}
              />
            )}
            {activeStep === 3 && (
              <BudgetSelection
                campagineData={campagineData.budget}
                updateCampaignData={updateCampaignData}
              />
            )}
          </Paper>

          <Stack direction="row">
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              // disabled={!isStepValid(activeStep)} // Disable button if the current step is invalid
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Stack>
        </>
      )}
    </DashboardContent>
  );
}
