import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { _tags } from 'src/_mock';

import { Field, Form } from 'src/components/hook-form';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { fCurrency } from 'src/utils/format-number';

const NewBudgetSchema = zod.object({
  amount: zod.number().nonnegative().min(4),
  percentage: zod.number().nonnegative(),
  taxes: zod.number().nonnegative(),
});

export function BudgetSelection({ campaignData, updateCampaignData }) {
  const ChangeCustomPricing = useCallback(
    (e) => {
      updateCampaignData('budget', {
        amount: parseInt(formValues?.amount),
        currency: formValues?.currency,
        percentage: {
          custom_tax_percentage: parseInt(formValues.taxes),
          custom_percentage_enabled: e.target.checked,
          custom_percentage_amount:
            (parseInt(formValues.taxes) * parseInt(formValues.amount)) / 100,
        },
      });
    },
    [campaignData]
  );

  const defaultValues = useMemo(
    () => ({
      amount: campaignData?.amount || 0,
      currency: campaignData?.currency || 'USD',
      taxes: campaignData?.percentage?.custom_tax_percentage
        ? campaignData?.percentage?.custom_tax_percentage
        : 0,
    }),
    [campaignData]
  );
  const methods = useForm({
    resolver: zodResolver(NewBudgetSchema),
    defaultValues,
  });
  const { watch } = methods;
  const formValues = watch();

  const prevFormValues = useRef({});
  useEffect(() => {
    const formValuesStr = JSON.stringify(formValues);
    const prevFormValuesStr = JSON.stringify(prevFormValues.current);

    if (formValuesStr !== prevFormValuesStr) {
      updateCampaignData('budget', {
        amount: parseInt(formValues?.amount),
        currency: formValues?.currency,
        percentage: {
          custom_tax_percentage: parseInt(formValues.taxes),
          custom_percentage_enabled: campaignData?.percentage?.custom_percentage_enabled
            ? true
            : false,
          custom_percentage_amount:
            (parseInt(formValues.taxes) * parseInt(formValues.amount)) / 100,
        },
      });

      prevFormValues.current = formValues;
    }
  }, [formValues, campaignData]);

  const renderPricing = (
    <Card>
      <CardHeader title="Pricing" subheader="Price related inputs" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Number
          name="amount"
          label="Customer's Campaign Amount"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  $
                </Box>
              </InputAdornment>
            ),
          }}
        />

        <Stack>
          <FormControlLabel
            control={<Switch id="toggle-taxes" />}
            label="Set Custom Revenue"
            checked={campaignData?.percentage.custom_percentage_enabled}
            onChange={ChangeCustomPricing}
          />
        </Stack>

        <Stack
          sx={{
            rowGap: 5,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          }}
        >
          {campaignData?.percentage?.custom_percentage_enabled && (
            <>
              <Field.Number
                name="taxes"
                label="Company's Revenue (%)"
                placeholder="0.00"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        %
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />

              <Stack
                sx={{
                  p: 1,
                  width: 1,
                  minHeight: 54,
                  borderRadius: 1,
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  typography: 'body2',
                  bgcolor: 'background.neutral',
                }}
              >
                Company's Revenue:{' '}
                {/* {fCurrency((campaignData?.amount * campaignData?.percentage?.custom_percentage_amount) / 100)} */}
                {fCurrency(
                  campaignData?.percentage?.custom_percentage_amount
                    ? campaignData?.percentage?.custom_percentage_amount
                    : 0
                )}
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <>
      <Form methods={methods}>{renderPricing}</Form>
    </>
  );
}
