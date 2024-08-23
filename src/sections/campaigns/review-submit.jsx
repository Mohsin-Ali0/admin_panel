import React from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Box, Chip, useTheme, useMediaQuery, Icon } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';
import { decodeGoogleSpecialCharacters } from 'src/utils/decode-google-characters';

import { FlagIcon, Iconify } from 'src/components/iconify';
import { getCountry } from 'src/components/country-select';
import { ComponentBlock, ComponentContainer } from 'src/components/compoenet-block/component-block';
import { useGetCustomCampaignDetails } from 'src/actions/configuration';

export const ReviewSubmit = ({
  sx,
  campaignData,
  slotProps,

  offsetValue = 0.3,

  queryClassName = 'scroll__to__view',
  ...other
}) => {
  const { customCampaign } = useGetCustomCampaignDetails();
  const ReviewDetails = [
    { name: 'Review the Budget', component: <BudgetReview data={campaignData.budget} /> },
    {
      name: 'Estimated Outcome',
      component: (
        <EstimatedDetails data={campaignData.budget} BidDetails={customCampaign?.bidCost} />
      ),
    },
    {
      name: 'Review the Channel',
      component: <ChannelReview data={campaignData?.channel?.selectedChannel} />,
    },
    {
      name: 'Review the Videos',
      component: <VideosReview data={campaignData?.videos?.selectedVideos} />,
    },
    {
      name: 'Review the Audience and Inrests Targeting',
      component: <AudienceAndInrestReview data={campaignData.audience} />,
    },
  ];

  const renderReview = (
    <Stack
      component="section"
      spacing={5}
      flex="1 1 auto"
      sx={{
        minWidth: 0,
        borderRadius: 2,
        p: { xs: 3, md: 5 },
        bgcolor: 'background.neutral',
        ...slotProps?.section,
      }}
    >
      {ReviewDetails.map((section, index) => (
        <Card key={index} className={queryClassName}>
          <CardHeader title={section.name} />
          <CardContent>{section.component}</CardContent>
        </Card>
      ))}
    </Stack>
  );
  return <>{renderReview}</>;
};

const BudgetReview = ({ data }) => (
  <Stack
    sx={{
      rowGap: 5,
      columnGap: 3,
      display: 'grid',
      gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
    }}
  >
    <ComponentBlock title="Campaign Total Amount ($)">
      <Typography variant="body1">{fCurrency(data.amount)}</Typography>
    </ComponentBlock>
    <ComponentBlock title="Company's Revenue (%)">
      <Typography variant="body1">{data.percentage.custom_tax_percentage}%</Typography>
    </ComponentBlock>
    <ComponentBlock title="Revenue Amount ($)">
      <Typography variant="body1">{fCurrency(data.percentage.custom_percentage_amount)}</Typography>
    </ComponentBlock>
  </Stack>
);

const EstimatedDetails = ({ data, BidDetails }) => {
  let campaign_amount_aftertax =
    parseFloat(data.amount) - parseFloat(data.percentage.custom_percentage_amount);

  return (
    <Stack
      sx={{
        rowGap: 5,
        columnGap: 3,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
      }}
    >
      <ComponentBlock title="Views">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            color: 'text.primary',
          }}
        >
          <Iconify icon="hugeicons:view" />
          <Typography variant="body1">
            {Math.floor(
              parseFloat(campaign_amount_aftertax) /
                parseFloat(BidDetails?.interactions?.hiCpv?.value)
            )}
            ~{' '}
            {Math.floor(
              parseFloat(campaign_amount_aftertax) /
                parseFloat(BidDetails?.interactions?.loCpv?.value)
            )}{' '}
          </Typography>
        </Box>
      </ComponentBlock>
      <ComponentBlock title="Subsribers">
        <Iconify icon="healthicons:people" />
        <Typography variant="body1">
          {Math.floor(
            parseFloat(campaign_amount_aftertax) /
              parseFloat(BidDetails?.interactions?.hiCostPerSubscriber?.value)
          )}
          ~{' '}
          {Math.floor(
            parseFloat(campaign_amount_aftertax) /
              parseFloat(BidDetails?.interactions?.loCostPerSubscriber?.value)
          )}{' '}
        </Typography>
      </ComponentBlock>
      <ComponentBlock title="Likes">
        <Iconify icon="material-symbols:thumb-up-outline" />
        <Typography variant="body1">
          {Math.floor(
            parseFloat(campaign_amount_aftertax) /
              parseFloat(BidDetails?.interactions?.hiCostPerLike?.value)
          )}
          ~{' '}
          {Math.floor(
            parseFloat(campaign_amount_aftertax) /
              parseFloat(BidDetails?.interactions?.loCostPerLike?.value)
          )}{' '}
        </Typography>
      </ComponentBlock>
    </Stack>
  );
};

const ChannelReview = ({ data }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <ComponentBlock sx={{ p: 2 }} title="Selected Channel">
      {isLargeScreen ? (
        <Stack sx={{ flexDirection: 'row' }} alignItems="center" textAlign="center">
          <Stack sx={{ p: 3, pb: 0 }} alignItems="center" textAlign="center">
            <Avatar
              alt={data?.title}
              src={data?.thumbnail}
              variant="rounded"
              sx={{ width: 100, height: 100, mb: 2 }}
            />
          </Stack>
          <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
          <Stack sx={{ p: 3, pb: 2 }} textAlign="left">
            <Typography variant="button" sx={{ color: 'text.primary', pb: 2 }}>
              Channel Name: {decodeGoogleSpecialCharacters(data?.title)}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.primary', pb: 2 }}>
              Subscribers: {data?.subscribersCount}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.primary' }}>
              Description: {decodeGoogleSpecialCharacters(data?.description)}
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <Grid container spacing={2} alignItems="center" textAlign="center">
          <Grid item xs={12}>
            <Stack alignItems="center" textAlign="center">
              <Avatar
                alt={data?.title}
                src={data?.thumbnail}
                variant="rounded"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
          </Grid>
          <Grid item xs={12}>
            <Stack textAlign="left">
              <Typography variant="button" sx={{ color: 'text.primary', pb: 2 }}>
                Channel Name: {decodeGoogleSpecialCharacters(data?.title)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.primary', pb: 2 }}>
                Subscribers: {data?.subscribersCount}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.primary' }}>
                Description: {decodeGoogleSpecialCharacters(data?.title)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      )}
    </ComponentBlock>
  );
};

const VideosReview = ({ data }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <ComponentBlock sx={{ p: 2 }} title="Selected Videos">
      {isLargeScreen ? (
        <Stack sx={{ flexDirection: 'column' }} alignItems="flex-start" textAlign="center">
          {data?.map((video, index) => (
            <React.Fragment key={index}>
              <Stack sx={{ flexDirection: 'row' }}>
                <Stack sx={{ p: 3, pb: 0 }} alignItems="center" textAlign="center">
                  <Avatar
                    alt={video?.title}
                    src={video?.thumbnail}
                    variant="rounded"
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                </Stack>
                <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
                <Stack sx={{ p: 3, pb: 2 }} textAlign="left">
                  <Typography variant="button" sx={{ color: 'text.primary', pb: 2 }}>
                    Video Title : {decodeGoogleSpecialCharacters(video?.title)}
                  </Typography>
                </Stack>
              </Stack>
              {index < data.length - 1 && <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />}
            </React.Fragment>
          ))}
        </Stack>
      ) : (
        <Grid container spacing={2}>
          {data?.map((video, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <Stack sx={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Avatar
                    alt={video?.title}
                    src={video?.thumbnail}
                    variant="rounded"
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                  <Typography variant="caption" sx={{ color: 'text.primary', pb: 2 }}>
                    Video Title: {decodeGoogleSpecialCharacters(video?.title)}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </ComponentBlock>
  );
};

const AudienceAndInrestReview = ({ data }) => (
  <>
    {data.automated == true ? (
      <ComponentContainer>
        <ComponentBlock title="Automated Targetting">
          <Chip
            key="all-ages"
            color="info"
            variant="soft"
            sx={{
              whiteSpace: 'normal',
              height: 'auto',
              wordBreak: 'break-word',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
            }}
            label={
              <Box sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                Automatic Targeting will use YouTube Ads Algorithm to show your videos in the
                recommended list only to interested viewers that were watching similar content
                worldwide.
              </Box>
            }
          />
        </ComponentBlock>
      </ComponentContainer>
    ) : (
      <ComponentContainer>
        {data.countries.length > 0 && (
          <ComponentBlock sx={{ gap: 1 }} title="Selected Countries">
            <GetCountries data={data?.countries} />
          </ComponentBlock>
        )}
        {data.age.length > 0 && (
          <ComponentBlock title="Selected Age">
            <RenderChips data={data?.age} type="age" />
          </ComponentBlock>
        )}
        {data.gender.length > 0 && (
          <ComponentBlock title="Selected Gender">
            <RenderChips data={data?.gender} type="gender" />
            {/* <Chip label={data?.gender} size="small" color="info" variant="soft" /> */}
          </ComponentBlock>
        )}
        {data.intrest.length > 0 && (
          <ComponentBlock title="Selected Intrests">
            <RenderChips data={data?.intrest} type="intrest" />
          </ComponentBlock>
        )}
        {data.tags.length > 0 && (
          <ComponentBlock title="Selected Tags">
            <RenderChips data={data?.tags} type="tags" />
          </ComponentBlock>
        )}
      </ComponentContainer>
    )}
  </>
);

const GetCountries = ({ data }) =>
  data.map((option, index) => {
    const country = getCountry(option);
    return (
      <Chip
        key={country.label}
        label={country.label}
        size="small"
        variant="soft"
        color="info"
        icon={<FlagIcon code={country.code} sx={{ width: 16, height: 16, borderRadius: '50%' }} />}
      />
    );
  });

const RenderChips = ({ data, type }) => {
  switch (type) {
    case 'age':
      if (data.includes('All ages')) {
        return <Chip key="all-ages" label="All ages" size="small" color="info" variant="soft" />;
      }

      // Sort the age ranges
      const sortedData = data.sort((a, b) => {
        const ageOrder = {
          '18-24': 1,
          '25-34': 2,
          '35-44': 3,
          '45-54': 4,
          '55-64': 5,
          '65+': 6,
        };
        return (ageOrder[a] || 0) - (ageOrder[b] || 0);
      });

      return sortedData.map((age, index) => (
        <Chip key={index} label={age} size="small" color="info" variant="soft" />
      ));
    case 'gender':
      return <Chip label={data} size="small" color="info" variant="soft" />;
    case 'intrest':
      return data.map((intrest, index) => (
        <Chip key={index} label={intrest} size="small" color="info" variant="soft" />
      ));
    case 'tags':
      return data.map((tags, index) => (
        <Chip key={index} label={tags} size="small" color="info" variant="soft" />
      ));
  }

  // if (type === 'age') {
  //   if (data.includes('All ages')) {
  //     return <Chip key="all-ages" label="All ages" size="small" color="info" variant="soft" />;
  //   }

  //   // Sort the age ranges
  //   const sortedData = data.sort((a, b) => {
  //     const ageOrder = {
  //       '18-24': 1,
  //       '25-34': 2,
  //       '35-44': 3,
  //       '45-54': 4,
  //       '55-64': 5,
  //       '65+': 6,
  //     };
  //     return (ageOrder[a] || 0) - (ageOrder[b] || 0);
  //   });

  //   return sortedData.map((age, index) => (
  //     <Chip key={index} label={age} size="small" color="info" variant="soft" />
  //   ));
  // }
  // return data.map((age, index) => (
  //   <Chip key={index} label={age} size="small" color="info" variant="soft" />
  // ));
};
