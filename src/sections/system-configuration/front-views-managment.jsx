import { mutate } from 'swr';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, InputAdornment } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';
import axios, { endpoints } from 'src/utils/axios';

import { useGetContent } from 'src/actions/configuration';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { jwtDecode } from 'src/auth/context/jwt';

export const NewFrontManagmentSchema = zod
  .object({
    minAmount: schemaHelper.currency({
      message: {
        required_error: 'Minimum amount is required!',
        value_error: 'Minimum amount value must be greater than 0!',
        invalid_type_error: 'Minimum amount value is invalid!',
      },
    }),
    maxAmount: schemaHelper.currency({
      message: {
        required_error: 'Maximum amount is required!',
        value_error: 'Maximum amount value must be greater than 0!',
        invalid_type_error: 'Maximum amount value is invalid!',
      },
    }),
    cpv: schemaHelper.currency({
      message: {
        required_error: 'CPV is required!',
        value_error: 'CPV value must be greater than 0!',
        invalid_type_error: 'CPV value is invalid!',
      },
    }),
    costPerSubscriber: schemaHelper.currency({
      message: {
        required_error: 'Cost per subscriber is required!',
        value_error: 'Cost per subscriber value must be greater than 0!',
        invalid_type_error: 'Cost per subscriber value is invalid!',
      },
    }),
    bidCost: zod.object({
      views: zod.object({
        cpv: schemaHelper.currency({
          message: {
            required_error: 'Bid cost views CPV is required!',
            value_error: 'Bid cost views CPV value must be greater than 0!',
            invalid_type_error: 'Bid cost views CPV value is invalid!',
          },
        }),
      }),
      interactions: zod.object({
        loCpv: schemaHelper.currency({
          message: {
            required_error: 'Interaction low CPV is required!',
            value_error: 'Interaction low CPV value must be greater than 0!',
            invalid_type_error: 'Interaction low CPV value is invalid!',
          },
        }),
        hiCpv: schemaHelper.currency({
          message: {
            required_error: 'Interaction high CPV is required!',
            value_error: 'Interaction high CPV value must be greater than 0!',
            invalid_type_error: 'Interaction high CPV value is invalid!',
          },
        }),
        loCostPerSubscriber: schemaHelper.currency({
          message: {
            required_error: 'Interaction low cost per subscriber is required!',
            value_error: 'Interaction low cost per subscriber value must be greater than 0!',
            invalid_type_error: 'Interaction low cost per subscriber value is invalid!',
          },
        }),
        hiCostPerSubscriber: schemaHelper.currency({
          message: {
            required_error: 'Interaction high cost per subscriber is required!',
            value_error: 'Interaction high cost per subscriber value must be greater than 0!',
            invalid_type_error: 'Interaction high cost per subscriber value is invalid!',
          },
        }),
        loCostPerLike: schemaHelper.currency({
          message: {
            required_error: 'Interaction low cost per like is required!',
            value_error: 'Interaction low cost per like value must be greater than 0!',
            invalid_type_error: 'Interaction low cost per like value is invalid!',
          },
        }),
        hiCostPerLike: schemaHelper.currency({
          message: {
            required_error: 'Interaction high cost per like is required!',
            value_error: 'Interaction high cost per like value must be greater than 0!',
            invalid_type_error: 'Interaction high cost per like value is invalid!',
          },
        }),
      }),
    }),
    default_revenue: schemaHelper.number({
      message: {
        required_error: 'Default revenue is required!',
        value_error: 'Default revenue value must be greater than 0!',
        invalid_type_error: 'Default revenue value is invalid!',
      },
    }),
  })
  .refine(
    (data) => {
      const min = parseInt(data.minAmount.value);
      const max = parseInt(data.maxAmount.value);

      if (isNaN(min) || isNaN(max)) return true; // Skip if values are not numbers yet

      return min < max; // min must be less than max
    },
    {
      message: 'Maximum amount must be greater than the minimum amount.',
      path: ['maxAmount.value'], // Highlight maxAmount if max <= min
    }
  )
  .refine(
    (data) => {
      const min = parseInt(data.minAmount.value);
      const max = parseInt(data.maxAmount.value);

      if (isNaN(min) || isNaN(max)) return true; // Skip if values are not numbers yet

      return max > min; // max must be greater than min
    },
    {
      message: 'Minimum amount must be less than the maximum amount.',
      path: ['minAmount.value'], // Highlight minAmount if min >= max
    }
  )
  .refine(
    (data) => {
      const min = parseInt(data.minAmount.value);
      const max = parseInt(data.maxAmount.value);

      if (isNaN(min) || isNaN(max)) return true; // Skip if values are not numbers yet

      return min !== max; // min and max must not be equal
    },
    {
      message: 'Minimum amount and maximum amount cannot be equal.',
      path: ['minAmount.value', 'maxAmount.value'], // Highlight both if min == max
    }
  );

export function FrontViewsandPricing({ title, contentType, canEdit }) {
  const { content } = useGetContent(contentType);
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const defaultValues = useMemo(
    () => ({
      minAmount: content?.minAmount || '',
      maxAmount: content?.maxAmount || '',
      cpv: content?.cpv || '',
      costPerSubscriber: content?.costPerSubscriber || '',
      default_revenue: content?.default_revenue || '',
      bidCost: content?.bidCost || {},
      updatedBy:
        content?.lastUpdatedBy?.first_name && content?.lastUpdatedBy?.last_name
          ? `${content.lastUpdatedBy.first_name} ${content.lastUpdatedBy.last_name}`
          : 'Name information is missing',
      updatedAt: content?.lastUpdatedAt ? fDateTime(content?.lastUpdatedAt) : 'Just now',
    }),
    [content]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewFrontManagmentSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (content) {
      reset(defaultValues);
    }
  }, [content, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      data = {
        ...data,
        userId: jwtDecode(sessionStorage.getItem('jwt_access_token'))?.id,
        key: content?.key,
        contentId: content?._id,
      };
      await axios
        .post(endpoints.configuration.updateConfig, { data })
        .then((res) => {
          toast.success('Updated successfully');
          mutate([endpoints.configuration.getConfig, { params: { contentType: content.key } }]);
          backToTop();
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader
        title={title}
        subheader={`System's ${title} is Managed from here`}
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Text name="updatedBy" label="Last Updated by" disabled />
          <Field.Text name="updatedAt" label="Last Updated At" disabled />
        </Stack>
      </Stack>
    </Card>
  );

  const renderViews = (
    <Card>
      <CardHeader
        title="Front Pricing Managment"
        subheader={`Vidtrial's Front Views are Managed from here`}
        sx={{ mb: 3 }}
      />
      <Divider />
      <Stack spacing={5} sx={{ p: 5 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Text
            name="minAmount.value"
            label="Minimum Amount"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
          <Field.Text
            name="maxAmount.value"
            label="Maximum Amount"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>
    </Card>
  );

  const renderCampaignManagment = (
    <Card>
      <CardHeader
        title="Front Campaign managment"
        subheader={`Vidtrial's Front Campaign's Details are Managed from here`}
        sx={{ mb: 3 }}
      />
      <Divider />
      <Stack spacing={5} sx={{ p: 5 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Text
            name="cpv.value"
            label="Cost Per View"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
          <Field.Text
            name="costPerSubscriber.value"
            label="Cost per Subscriber"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
          <Field.Text
            name="bidCost.views.cpv.value"
            label="Cost Per View (Bid)"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
          <Field.Text
            name="bidCost.interactions.loCpv.value"
            label="Interaction Low Cost Per View"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
          <Field.Text
            name="bidCost.interactions.hiCpv.value"
            label="Interaction High Cost Per View"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
          <Field.Text
            name="bidCost.interactions.loCostPerSubscriber.value"
            label="Interaction Low Cost Per Subscriber"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
          <Field.Text
            name="bidCost.interactions.hiCostPerSubscriber.value"
            label="Interaction High Cost Per Subscriber"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
          <Field.Text
            name="bidCost.interactions.loCostPerLike.value"
            label="Interaction Low Cost Per Like"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
          <Field.Text
            name="bidCost.interactions.hiCostPerLike.value"
            label="Interaction High Cost Per Like"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>
    </Card>
  );
  const renderRevenueManagment = (
    <Card>
      <CardHeader
        title="Front Revenue managment"
        subheader={`Vidtrial's Front Revenue is Managed from here`}
        sx={{ mb: 3 }}
      />
      <Divider />
      <Stack spacing={5} sx={{ p: 5 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Text
            name="default_revenue"
            label="Default Revenue (%)"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>%</Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>
    </Card>
  );
  const renderActions = (
    <Stack direction="row" alignSelf="end">
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        sx={{ ml: 2 }}
      >
        Save changes
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }}>
        {renderDetails}
        <Divider />
        {renderViews}
        <Divider />
        {renderCampaignManagment}
        <Divider />
        {renderRevenueManagment}
        {canEdit && renderActions}
      </Stack>
    </Form>
  );
}
