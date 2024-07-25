import { z as zod } from 'zod';
import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import axios, { endpoints } from 'src/utils/axios';
import { Divider, IconButton, InputAdornment, MenuItem } from '@mui/material';
import { _roles } from 'src/_mock';
import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconify';
import { jwtDecode } from 'src/auth/context/jwt';
import { refreshUser } from 'src/actions/user';

// ----------------------------------------------------------------------

export const NewUserSchema = zod.object({
  user_image: schemaHelper.file({
    message: { required_error: 'Avatar is required!' },
  }),
  username: zod.string().min(1, { message: 'Username is required!' }),
  first_name: zod.string().min(1, { message: 'First Name is required!' }),
  last_name: zod.string().min(1, { message: 'Last Name is required!' }),
  password: zod
    .string()
    .refine((val) => val.length > 0, { message: 'Password is required!' })
    .refine((val) => val.length >= 6, { message: 'Password must be at least 6 characters long!' }),

  user_email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  role: zod.string().min(1, { message: 'Role is required!' }).default(''),
  user_status: zod.boolean(),
});

// ----------------------------------------------------------------------

export function UserNewEditForm({ currentUser }) {
  const router = useRouter();
  const [roles, setRoles] = useState([]); // State to store roles
  const passwordShow = useBoolean();
  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    try {
      const response = await axios.get(endpoints.roles.activeRoles);
      if (response.data && response.data.success) {
        setRoles(response.data.data); // Update state with roles data
      }
    } catch (error) {
      console.error(error);
    }
  };

  const defaultValues = useMemo(
    () => ({
      user_image: currentUser?.user_image || null,
      user_status: currentUser?.user_status || false,
      first_name: currentUser?.first_name || '',
      last_name: currentUser?.last_name || '',
      username: currentUser?.username || '',
      user_email: currentUser?.user_email || '',
      role: currentUser?.role_id || '', // Assuming role_id is used for the role field
      createdBy: currentUser?.createdBy?.first_name + ' ' + currentUser?.createdBy?.last_name || '',
      updatedBy: currentUser?.updatedBy
        ? currentUser?.updatedBy?.first_name + ' ' + currentUser?.updatedBy?.last_name
        : 'Not Updated Yet',
      password: '',
    }),
    [currentUser]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedBy = jwtDecode(sessionStorage.getItem('jwt_access_token')).id;
      const formData = new FormData();
      formData.append('updatedBy', updatedBy);
      currentUser ? formData.append('user_id', currentUser._id) : null;
      Object.keys(data).forEach((key) => {
        if (key === 'brand_logo' && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      });
      const userEndpoint = currentUser ? endpoints.users.update : endpoints.users.create;

      await axios
        .post(userEndpoint, formData)
        .then((response) => {
          reset();
          toast.success(response.data.message);
          {
            currentUser ? refreshUser(currentUser._id) : null;
          }
          router.push(paths.dashboard.users.root);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={values.user_status ? 'success' : 'error'}
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.user_status ? 'Active' : 'In Active'}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="user_image"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
            <Field.Switch
              name="user_status"
              labelPlacement="start"
              label={
                currentUser?.user_status ? (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Make User InActive
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Enableing this will Make the User Active
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Make User Active
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will Make the User Inactive
                    </Typography>
                  </>
                )
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="username" label="Username" />
              <Field.Text name="user_email" label="Email address" />
              <Field.Text name="first_name" label="First Name" />
              <Field.Text name="last_name" label="Last Name" />

              <Field.Text
                name="password"
                label="Password"
                placeholder="6+ characters"
                type={passwordShow.value ? 'text' : 'password'}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={passwordShow.onToggle} edge="end">
                        <Iconify
                          icon={passwordShow.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Field.Select name="role" label="Role">
                {roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>
                    {role.role_name}
                  </MenuItem>
                ))}
              </Field.Select>
            </Box>
            {/* <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <Field.Editor name="description" sx={{ maxHeight: 480 }} />
            </Stack> */}

            {currentUser && (
              <Stack spacing={3} sx={{ p: 3 }}>
                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack direction="row" alignItems="center" spacing={3}>
                  <Field.Text name="createdBy" label="Created by" disabled />
                  <Field.Text name="updatedBy" label="Last Updated by" disabled={true} />
                </Stack>
              </Stack>
            )}

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create user' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
