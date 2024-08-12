import { useForm } from 'react-hook-form';
import { useRef, useMemo, useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Chip, Divider, Checkbox, FormControlLabel } from '@mui/material';

import { _tags } from 'src/_mock';

import { Form, Field } from 'src/components/hook-form';
import { ComponentBlock, ComponentContainer } from 'src/components/compoenet-block/component-block';

const GENDER_OPTIONS = [
  { label: 'All genders', value: 'All genders' },
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
];
const AGE_OPTIONS = [
  { label: 'All ages', value: 'All ages' },
  { label: '18-24', value: '18-24' },
  { label: '25-34', value: '25-34' },
  { label: '35-44', value: '35-44' },
  { label: '45-54', value: '45-54' },
  { label: '55-64', value: '55-64' },
  { label: '65+', value: '65+' },
];
const INTREST_OPTIONS = [
  { label: 'Arts & Entertainment', value: 'Arts & Entertainment' },
  { label: 'Autos & Vehicles', value: 'Autos & Vehicles' },
  { label: 'Beauty & Fitness', value: 'Beauty & Fitness' },
  { label: 'Books & Literature', value: 'Books & Literature' },
  { label: 'Business & Industrial', value: 'Business & Industrial' },
  { label: 'Computers & Electronics', value: 'Computers & Electronics' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Food & Drink', value: 'Food & Drink' },
  { label: 'Games', value: 'Games' },
  { label: 'Health', value: 'Health' },
  { label: 'Hobbies & Leisure', value: 'Hobbies & Leisure' },
  { label: 'Home & Garden', value: 'Home & Garden' },
  { label: 'Internet & Telecom', value: 'Internet & Telecom' },
  { label: 'Jobs & Education', value: 'Jobs & Education' },
  { label: 'Law & Government', value: 'Law & Government' },
  { label: 'News', value: 'News' },
  { label: 'Online Communities', value: 'Online Communities' },
  { label: 'People & Society', value: 'People & Society' },
  { label: 'Pets & Animals', value: 'Pets & Animals' },
  { label: 'Real Estate', value: 'Real Estate' },
  { label: 'Reference', value: 'Reference' },
  { label: 'Science', value: 'Science' },
  { label: 'Shopping', value: 'Shopping' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Travel & Transportation', value: 'Travel & Transportation' },
  { label: 'World Localities', value: 'World Localities' },
];

export function AudienceSelection({ campaignData, updateCampaignData }) {
  const [auto, setAuto] = useState(campaignData?.automated);
  const prevFormValues = useRef({});

  const handleChangeAuto = (event) => {
    setAuto(event.target.checked);
    updateCampaignData('audience', {
      automated: event.target.checked,
    });
  };

  const defaultValues = useMemo(
    () => ({
      age: campaignData?.age || [],
      intrest: campaignData?.intrest || [],
      countries: campaignData?.countries || [],
      tags: campaignData?.tags || [],
      gender: campaignData?.gender || [],
    }),
    [campaignData]
  );

  const methods = useForm({ defaultValues });
  const { watch } = methods;
  const formValues = watch();

  useEffect(() => {
    const formValuesStr = JSON.stringify(formValues);
    const prevFormValuesStr = JSON.stringify(prevFormValues.current);

    if (formValuesStr !== prevFormValuesStr) {
      updateCampaignData('audience', {
        age: formValues.age,
        intrest: formValues.intrest,
        countries: formValues.countries,
        tags: formValues.tags,
        gender: formValues.gender,
      });
      prevFormValues.current = formValues;
    }
  }, [formValues, campaignData]);

  return (
    <>
      <FormControlLabel
        control={<Checkbox name="switch-Auto" checked={auto} onChange={handleChangeAuto} />}
        label="Automatically add the most relevant targeting for your channel"
        sx={{ alignSelf: 'flex-start' }}
      />

      <Divider sx={{ my: 5 }} />
      {!auto && (
        <Form methods={methods}>
          <ComponentContainer>
            <ComponentBlock title="Countries">
              <CountrySelection />
            </ComponentBlock>
            <ComponentBlock
              title="Audience"
              sx={{
                rowGap: 5,
                columnGap: 3,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
              }}
            >
              <ComponentBlock title="Gender">
                <GenderSelection />
              </ComponentBlock>
              <ComponentBlock title="Age">
                <AgeSelection />
              </ComponentBlock>
            </ComponentBlock>
            <ComponentBlock title="Interests">
              <InterestSelection />
            </ComponentBlock>
            <ComponentBlock title="Keywords">
              <KeywordSelection />
            </ComponentBlock>
          </ComponentContainer>
        </Form>
      )}
    </>
  );
}

function CountrySelection() {
  return (
    <Stack spacing={3} sx={{ p: 3, width: '100%' }}>
      <Typography variant="caption" sx={{ color: 'text.primary' }}>
        The number of estimated views can vary if you manually choose countries
      </Typography>
      <Field.CountrySelect multiple name="countries" placeholder="+ Countries" />
    </Stack>
  );
}

function GenderSelection() {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Gender</Typography>
      <Field.RadioGroup row name="gender" options={GENDER_OPTIONS} />
    </Stack>
  );
}

function AgeSelection() {
  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2">Age</Typography>
      <Field.MultiCheckbox row name="age" options={AGE_OPTIONS} sx={{ gap: 2 }} />
    </Stack>
  );
}

function InterestSelection() {
  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2">Interests</Typography>
      <Field.MultiCheckbox
        row
        name="intrest"
        options={INTREST_OPTIONS}
        sx={{
          gap: 2,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)', sm: 'repeat(2, 1fr)' },
        }}
      />
    </Stack>
  );
}

function KeywordSelection() {
  return (
    <Stack spacing={3} sx={{ p: 3, width: '100%' }}>
      <Typography variant="caption" sx={{ color: 'text.Secondary' }}>
        Please add up to 10 keywords or phrases that can help our algorithms show your channel to
        people searching for similar content
      </Typography>
      <Field.Autocomplete
        name="tags"
        label="Tags"
        placeholder="+ Tags"
        multiple
        freeSolo
        disableCloseOnSelect
        options={_tags.map((option) => option)}
        getOptionLabel={(option) => option}
        renderOption={(props, option) => (
          <li {...props} key={option}>
            {option}
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option}
              label={option}
              size="small"
              color="info"
              variant="soft"
            />
          ))
        }
      />
    </Stack>
  );
}
