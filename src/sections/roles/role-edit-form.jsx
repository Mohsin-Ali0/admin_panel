import { z as zod } from 'zod';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRouter } from 'src/routes/hooks';
import { Form, Field, RHFSwitch } from 'src/components/hook-form';
import { Checkbox, Divider, Switch } from '@mui/material';
import { toast } from 'src/components/snackbar';
import { paths } from 'src/routes/paths';
import { jwtDecode } from 'src/auth/context/jwt';
import axios, { endpoints } from '../../utils/axios';
import { Label } from 'src/components/label';

// Define the schema with the screens array
const RoleSchema = zod.object({
  role_name: zod.string().min(1, { message: 'Name is required!' }),
  screens: zod
    .array(
      zod.object({
        name: zod.string(),
        view: zod.boolean(),
        edit: zod.boolean(),
      })
    )
    .refine((screens) => screens.some((screen) => screen.view), {
      message: 'At least one screen must have "View" enabled',
    }),
  role_status: zod.boolean(),
});

const initialScreens = [
  { name: 'Dashboard', view: false, edit: false },
  { name: 'Campaigns', view: false, edit: false },
  { name: 'Custom Campaigns', view: false, edit: false },
  { name: 'Roles', view: false, edit: false },
  { name: 'Users', view: false, edit: false },
];

export function RoleEditForm({ currentRole }) {
  const router = useRouter();
  const [screens, setScreens] = useState(initialScreens);

  const handleCheckboxChange = (index, type) => {
    setScreens((prevScreens) =>
      prevScreens.map((screen, i) => {
        if (i !== index) return screen;

        const newScreen = { ...screen };
        switch (type) {
          case 'all': {
            const isChecked = !newScreen.view || !newScreen.edit;
            newScreen.view = isChecked;
            newScreen.edit = isChecked;
            break;
          }
          case 'view': {
            newScreen.view = !newScreen.view;
            if (!newScreen.view) {
              newScreen.edit = false;
            }
            break;
          }
          case 'edit': {
            newScreen.edit = !newScreen.edit;
            if (newScreen.edit) {
              newScreen.view = true;
            }
            break;
          }
          default:
            break;
        }
        return newScreen;
      })
    );
  };

  const defaultValues = useMemo(
    () => ({
      role_name: currentRole?.role_name || '',
      screens: currentRole?.permissions || initialScreens,
      createdBy: currentRole?.createdBy.first_name + ' ' + currentRole?.createdBy.last_name || '',
      role_status: currentRole?.role_status || false, // Ensure default value is set
    }),
    [currentRole]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(RoleSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    setValue('screens', screens);
  }, [screens, setValue]);

  useEffect(() => {
    if (currentRole && currentRole.permissions) {
      const permissions = currentRole.permissions;
      const transformedScreens = Object.keys(permissions).map((key) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        view: permissions[key].view,
        edit: permissions[key].edit,
      }));
      setScreens(transformedScreens);
    }
  }, [currentRole, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const userId = jwtDecode(sessionStorage.getItem('jwt_access_token')).id;
      const formData = {
        ...data,
        user_id: userId,
        role_id: currentRole?._id,
        // role_status: data.role_status, // Ensure role_status is included
      };
      await axios
        .post(endpoints.roles.update, formData)
        .then((res) => {
          toast.success(res.data.message);
          reset();
          router.push(paths.dashboard.roles.root);
        })
        .catch((err) => {
          toast.error(err.message);
        });
      console.info('DATA', data);
    } catch (error) {
      toast.error('toast');
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              display="flex"
              sx={{ pb: 2 }}
              alignItems={'flex-end'}
              justifyContent={'flex-end'}
              flexDirection={'row'}
            >
              {currentRole && (
                <Label
                  color={values.role_status ? 'success' : 'error'}
                  sx={{ alignSelf: 'flex-end' }}
                >
                  {values.role_status ? 'Active' : 'In Active'}
                </Label>
              )}
            </Box>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="role_name" label="Role name" />
              <Box
                rowGap={3}
                columnGap={2}
                display="flex"
                alignItems={'center'}
                justifyContent={'start'}
              >
                <Field.Switch
                  name="role_status"
                  labelPlacement="start"
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Role Status
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Disable or enable this role
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                />
              </Box>
            </Box>
            {errors.screens && (
              <Typography color="error" variant="body2">
                {errors.screens.message}
              </Typography>
            )}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Allowed Screens:
              </Typography>
              {screens.map((screen, index) => (
                <Box
                  key={index}
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(3, 1fr)',
                  }}
                  mb={2}
                  pl={2}
                >
                  <Typography variant="subtitle2">{screen.name}</Typography>

                  <div>
                    <FormControlLabel
                      label="Select All"
                      control={
                        <Checkbox
                          size="medium"
                          checked={screen.view && screen.edit}
                          onChange={() => handleCheckboxChange(index, 'all')}
                        />
                      }
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      label="View"
                      control={
                        <Checkbox
                          size="medium"
                          checked={screen.view}
                          onChange={() => handleCheckboxChange(index, 'view')}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Edit"
                      control={
                        <Checkbox
                          size="medium"
                          checked={screen.edit}
                          onChange={() => handleCheckboxChange(index, 'edit')}
                        />
                      }
                    />
                  </div>
                </Box>
              ))}
            </Box>

            <Stack spacing={3} sx={{ p: 3 }}>
              <Divider sx={{ borderStyle: 'dashed' }} />

              <Stack direction="row" alignItems="center" spacing={3}>
                <Field.Text name="createdBy" label="Created by" disabled />
                <Field.Text name="createdBy" label="Last Updated by" fullWidth disabled={true} />
              </Stack>
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentRole ? 'Create Role' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
