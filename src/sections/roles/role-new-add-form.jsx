import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect, useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Checkbox } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { jwtDecode } from 'src/auth/context/jwt';

import axios, { endpoints } from '../../utils/axios';
import { AuthContext } from 'src/auth/context/auth-context';

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
});

const initialScreens = [
  { name: 'Dashboard', view: false, edit: false },
  { name: 'Campaigns', view: false, edit: false },
  { name: 'Custom Campaigns', view: false, edit: false },
  { name: 'Roles', view: false, edit: false },
  { name: 'Users', view: false, edit: false },
  { name: 'System Configuration', view: false, edit: false },
];

export function RoleNewEditForm({ currentRole }) {
  const router = useRouter();
  const [screens, setScreens] = useState(currentRole?.screens || initialScreens);
  const { user } = useContext(AuthContext);
  let permissions = jwtDecode(user.accessToken)?.AllowedScreens;
  let canEdit = permissions.roles.edit;

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
      screens: currentRole?.screens || initialScreens,
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      const userId = jwtDecode(sessionStorage.getItem('jwt_access_token')).id;
      const formData = {
        ...data,
        user_id: userId,
      };
      await axios
        .post(endpoints.roles.create, formData)
        .then((res) => {
          toast.success(res.data.message);
          reset();
          router.push(paths.dashboard.roles.root);
        })
        .catch((err) => {
          toast.error(err.message);
        });
      console.info('DATA', formData);
    } catch (error) {
      toast.success('toast');
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
            >
              <Field.Text name="role_name" label="Role name" />
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

            {canEdit && (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentRole ? 'Create Role' : 'Save changes'}
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
