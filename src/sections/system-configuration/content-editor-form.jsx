import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { fDateTime } from 'src/utils/format-time';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import axios, { endpoints } from 'src/utils/axios';
import { jwtDecode } from 'src/auth/context/jwt';
import { mutate } from 'swr';

// ----------------------------------------------------------------------

export const NewTourSchema = zod.object({
  content: schemaHelper
    .editor({
      message: { required_error: 'Content is required!' },
    })
    .min(100, { message: 'Content must be at least 100 characters' }),
});

export function ContentEditForm({ contentData, title, canEdit }) {
  const router = useRouter();

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const defaultValues = useMemo(
    () => ({
      content: contentData?.value || '',
      updatedBy:
        contentData?.lastUpdatedBy?.first_name && contentData?.lastUpdatedBy?.last_name
          ? `${contentData.lastUpdatedBy.first_name} ${contentData.lastUpdatedBy.last_name}`
          : 'Name information is missing' || 'Super Admin',
      updatedAt: contentData?.lastUpdatedAt ? fDateTime(contentData?.lastUpdatedAt) : 'Just now',
    }),
    [contentData]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewTourSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (contentData) {
      reset(defaultValues);
    }
  }, [contentData, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      data = {
        ...data,
        userId: jwtDecode(sessionStorage.getItem('jwt_access_token'))?.id,
        key: contentData?.key,
        contentId: contentData?._id,
      };

      await axios
        .post(endpoints.configuration.updateConfig, { data })
        .then((res) => {
          toast.success('Update successfully');
          mutate([endpoints.configuration.getConfig, { params: { contentType: contentData.key } }]);
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
          spacing={1.5}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gridGap: 3,
            rowGap: 3,
          }}
        >
          <Field.Text name="updatedBy" label="Last Updated by" disabled />
          <Field.Text name="updatedAt" label="Last Updated At" disabled />
        </Stack>
        <Divider />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Content</Typography>
          <Field.Editor name="content" sx={{ maxHeight: 480 }} />
        </Stack>
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
        {/* {!contentData ? 'Create tour' : 'Save changes'} */}
        Save changes
      </LoadingButton>
    </Stack>
  );
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }}>
        {renderDetails}
        {canEdit && renderActions}
      </Stack>
    </Form>
  );
}
