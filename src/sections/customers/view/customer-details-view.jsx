import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomerDetailsInfo } from '../customer-details-info';
import { CustomerDetailsItems } from '../customer-details-item';

// ----------------------------------------------------------------------

export function CustomerDetailsView({ customer }) {
  const [status, setStatus] = useState(customer?.status);

  const handleChangeStatus = useCallback((newValue) => {
    setStatus(newValue);
  }, []);

  return (
    <DashboardContent>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <CustomerDetailsItems
              items={customer?.paymentIntents}
              // taxes={customer?.taxes}
              // shipping={customer?.shipping}
              // discount={customer?.discount}
              // subtotal={customer?.subtotal}
              totalAmount={customer?.totalAmount}
            />
            {/* <CustomerDetailsInfo customer={customer} /> */}
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <CustomerDetailsInfo customer={customer} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
