import { useState } from 'react';
import { ComponentBlock, ComponentContainer } from 'src/components/compoenet-block/component-block';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { CountrySelect } from 'src/components/country-select';
import { useForm, FormProvider } from 'react-hook-form';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { _tags } from 'src/_mock';
import { Chip } from '@mui/material';
const options = ['Option 1', 'Option 2'];
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
export function AudienceSelection() {
  const [inputValue, setInputValue] = useState('');

  const [value, setValue] = useState(options[0]);

  const [singleLabel, setSingleLabel] = useState('Armenia');

  const [singleCode, setSingleCode] = useState('AR');

  const [multiLabel, setMultiLabel] = useState(['Austria', 'Australia', 'Bulgaria']);

  const [multiCode, setMultiCode] = useState(['BJ', 'BL', 'BM']);

  const methods = useForm({
    defaultValues: {
      gender: [],
    },
  });
  return (
    <FormProvider {...methods}>
      <ComponentContainer title="Audience and Intrest">
        <ComponentBlock title="Countries">
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Typography variant="body1">Select the countries you want to target</Typography>
          </Box>

          <Stack spacing={1.5} sx={{ width: 1 }}>
            <CountrySelect
              id="multiple-label"
              multiple
              fullWidth
              // limitTags={3}
              label="Choose countries"
              placeholder="Choose countries"
              value={multiLabel}
              onChange={(event, newValue) => setMultiLabel(newValue)}
            />
            <Stack
              sx={{
                p: 1,
                width: 1,
                minHeight: 54,
                borderRadius: 1,
                textAlign: 'right',
                typography: 'body2',
                bgcolor: 'background.neutral',
              }}
            >
              <small>Output:</small>{' '}
              <strong>
                <small>{multiLabel.join(', ') ?? '-'}</small>
              </strong>
            </Stack>
          </Stack>
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
            <Stack spacing={1}>
              <Typography variant="subtitle2">Gender</Typography>
              {/* <Field.MultiCheckbox row name="gender" options={GENDER_OPTIONS} sx={{ gap: 2 }} /> */}
              <Field.RadioGroup row name="Gender" options={GENDER_OPTIONS} />
            </Stack>
          </ComponentBlock>

          <ComponentBlock title="Age">
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Age</Typography>
              <Field.MultiCheckbox row name="gender" options={AGE_OPTIONS} sx={{ gap: 2 }} />
            </Stack>
          </ComponentBlock>
        </ComponentBlock>
        <ComponentBlock title="Interests">
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Interests</Typography>
            <Field.MultiCheckbox
              row
              name="gender"
              options={INTREST_OPTIONS}
              sx={{
                gap: 2,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(4, 1fr)',
                  sm: 'repeat(2, 1fr)',
                },
              }}
            />
          </Stack>
        </ComponentBlock>
        <ComponentBlock title="Keywords">
          <Stack spacing={3} sx={{ p: 3, width: '100%' }}>
            <Typography variant="subtitle2">Tags</Typography>

            <Field.Autocomplete
              name="tags"
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
        </ComponentBlock>
      </ComponentContainer>
    </FormProvider>
  );
}
