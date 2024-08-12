import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

// Utility function to validate and format the input value
const formatNumber = (value) => {
  // Remove non-numeric characters except for decimal point
  return value.replace(/[^0-9.]/g, '');
};

// ----------------------------------------------------------------------

export function RHFNumberField({ name, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type="text"  // Use text to apply custom validation
          value={field.value || ''}
          onChange={(event) => {
            // Format and validate the input value
            const newValue = formatNumber(event.target.value);

            // Prevent negative values and special characters
            // Ensure that value doesn't start with a decimal point
            if (/^\d*\.?\d*$/.test(newValue)) {
              field.onChange(newValue);
            }
          }}
          error={!!error}
          helperText={error?.message ?? helperText}
          inputProps={{
            autoComplete: 'off',
            inputMode: 'decimal', // Allows decimal input
            pattern: '\\d*\\.?\\d*', // Regular expression to accept only digits and decimal points
            min: 0, // Minimum value to prevent negative numbers
            step: 'any', // Allows decimal points
            style: { 
              // Disable scroll
              MozAppearance: 'textfield',
              WebkitAppearance: 'none'
            },
            onKeyDown: (event) => {
              // Prevent entering 'e', 'E', '+', '-', and other non-numeric characters
              if (['e', 'E', '+', '-', '.'].includes(event.key)) {
                event.preventDefault();
              }
            }
          }}
          {...other}
        />
      )}
    />
  );
}
