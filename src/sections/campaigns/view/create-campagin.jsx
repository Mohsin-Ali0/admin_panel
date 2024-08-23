import { toast } from 'sonner';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import axios, { endpoints } from 'src/utils/axios';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { jwtDecode } from 'src/auth/context/jwt';

import { ReviewSubmit } from '../review-submit';
import { PaymentLinkScreen } from '../payment-link';
import { VideoSelection } from '../videos-selection';
import { BudgetSelection } from '../budget-selection';
import { AudienceSelection } from '../audience-intrest';
import { ChannelSelection } from '../channel-selection';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const steps = [
  'Select Channel',
  'Choose Videos to Promote',
  'Select Audience and Intrest',
  'Set Budget',
  'Review and Submit',
];

export function CreateCampaignView({ canEdit }) {
  const [activeStep, setActiveStep] = useState(0);

  const [skipped, setSkipped] = useState(new Set());

  const [campaignData, setcampaignData] = useState({
    channel: {
      selectedChannel: null,
      ChannelsList: [],
      url: '',
    },
    videos: {
      selectedVideos: [],
      VideosList: [],
      url: '',
      selectedType: 1,
      ManualSelected: false,
    },
    audience: {
      automated: true,
      age: [],
      intrest: [],
      countries: [],
      tags: [],
      gender: [],
    },
    budget: {
      amount: 0, // in cents
      currency: 'USD',
      percentage: {
        custom_percentage_enabled: false,
        custom_percentage_amount: 0,
        custom_tax_percentage: 0,
      },
    },
  });

  const [LinkStatus, setLinkStatus] = useState(true);
  const [paymentLink, setPaymentLink] = useState('');

  const isStepOptional = (step) => step === 2;

  const isStepSkipped = (step) => skipped.has(step);

  // Check if the current step is valid
  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return campaignData.channel.selectedChannel !== null;
      case 1:
        return campaignData.videos.selectedVideos.length > 0;
      case 2:
        return true;
      case 3:
        return (
          campaignData.budget.amount > 0 &&
          (campaignData.budget.percentage.custom_percentage_enabled === false ||
            (campaignData.budget.percentage.custom_percentage_enabled === true &&
              campaignData.budget.percentage.custom_tax_percentage > 0))
        ); // Other steps do not have specific conditions for now
      default:
        return true;
    }
  };

  const handleNext = useCallback(() => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      // Call the API when the last step is reached
      CreateCampaignandGeneratePaymentLink();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    setSkipped(newSkipped);
  }, [activeStep, skipped]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setLinkStatus(false);
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
    updateCampaignData('audience', {
      automated: true,
    });
  }, [activeStep]);

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, []);

  const updateCampaignData = useCallback((key, value) => {
    setcampaignData((prevData) => ({
      ...prevData,
      [key]: {
        ...prevData[key],
        ...value,
      },
    }));
  }, []);

  const CreateCampaignandGeneratePaymentLink = async () => {
    const { channel, videos, audience, budget } = campaignData;
    const { selectedChannel } = channel;
    const { selectedVideos } = videos;
    try {
      const userId = jwtDecode(sessionStorage.getItem('jwt_access_token')).id;
      const res = await axios.post(endpoints.customCampaigns.createCampaign, {
        channel: selectedChannel,
        videos: selectedVideos,
        audience,
        budget,
        userId,
      });
      if (res.status === 200) {
        setLinkStatus(true);
        toast.success('Campaign Created Successfully');
        setPaymentLink(res?.data?.redirectUrl);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };

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
            {LinkStatus ? (
              <PaymentLinkScreen paymentLink={paymentLink} />
            ) : (
              <>
                <LoadingScreen />
                <Typography variant="h4" textAlign="center" sx={{ p: 4 }}>
                  Creating the Campaign Please wait
                </Typography>
              </>
            )}
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
                campagineData={campaignData.channel}
                updateCampaignData={updateCampaignData}
              />
            )}
            {activeStep === 1 && (
              <VideoSelection
                channelId={campaignData.channel.selectedChannel?.channelId}
                campagineData={campaignData.videos}
                updateCampaignData={updateCampaignData}
              />
            )}
            {activeStep === 2 && (
              <AudienceSelection
                campaignData={campaignData.audience}
                updateCampaignData={updateCampaignData}
              />
            )}
            {activeStep === 3 && (
              <BudgetSelection
                campaignData={campaignData.budget}
                updateCampaignData={updateCampaignData}
              />
            )}
            {activeStep === 4 && (
              <ReviewSubmit campaignData={campaignData} updateCampaignData={updateCampaignData} />
            )}
          </Paper>

          {canEdit && (
            <Stack direction="row">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
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
                disabled={!isStepValid(activeStep)} // Disable button if the current step is invalid
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Stack>
          )}
        </>
      )}
    </DashboardContent>
  );
}
