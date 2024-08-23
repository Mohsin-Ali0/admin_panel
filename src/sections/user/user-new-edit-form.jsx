import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Divider,
  MenuItem,
  IconButton,
  InputAdornment,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  Alert,
  DialogActions,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { fData } from 'src/utils/format-number';
import axios, { endpoints } from 'src/utils/axios';

import { refreshUser } from 'src/actions/user';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { jwtDecode } from 'src/auth/context/jwt';
import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------
export const NewUserSchema = zod.object({
  user_image: schemaHelper.file({
    message: { required_error: 'Avatar is required!' },
  }),
  username: zod.string().min(1, { message: 'Username is required!' }),
  first_name: zod.string().min(1, { message: 'First Name is required!' }),
  last_name: zod.string().min(1, { message: 'Last Name is required!' }),
  password: zod.string().optional(), // Make password optional
  user_email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  role: zod.string().min(1, { message: 'Role is required!' }).default(''),
  user_status: zod.boolean(),
});

// ----------------------------------------------------------------------

export function UserNewEditForm({ currentUser, canEdit }) {
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
      createdBy: `${currentUser?.createdBy?.first_name} ${currentUser?.createdBy?.last_name}` || '',
      updatedBy: currentUser?.updatedBy
        ? `${currentUser?.updatedBy?.first_name} ${currentUser?.updatedBy?.last_name}`
        : 'Not Updated Yet',
      updatedAt: currentUser?.updatedAt ? fDateTime(currentUser?.updatedAt) : 'Not Updated Yet',
      password: '',
    }),
    [currentUser]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(
      NewUserSchema.refine(
        (data) => {
          if (!currentUser && !data.password) {
            return false;
          }
          return true;
        },
        {
          path: ['password'],
          message: 'Password is required!',
        }
      )
    ),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentUser && !data.password) {
        setError('password', { message: 'Password is required for new users!' });
        return;
      }

      if (currentUser && passwordShow.value && !data.password) {
        setError('password', { message: 'Password is required if you choose to update it!' });
        return;
      }

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
      console.error('Form submission error:', error);
      toast.error(error.message || 'An error occurred during form submission');
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
            {canEdit && (
              <Stack alignItems="flex-end" sx={{ mb: 3 }}>
                {/* <LoadingButton variant="contained">{'Update Password'}</LoadingButton> */}
                {currentUser && (
                  <LoadingButton variant="contained" onClick={passwordShow.onTrue}>
                    Update Password
                  </LoadingButton>
                )}
              </Stack>
            )}

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

              {!currentUser && (
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
              )}

              <Field.Select name="role" label="Role">
                {roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>
                    {role.role_name}
                  </MenuItem>
                ))}
              </Field.Select>
            </Box>

            {currentUser && (
              <Stack spacing={3} sx={{ p: 3 }}>
                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack direction="row" alignItems="center" spacing={3}>
                  <Field.Text name="createdBy" label="Created by" disabled />
                  <Field.Text name="updatedBy" label="Last Updated by" disabled />
                </Stack>
                <Field.Text name="updatedAt" label="Last Updated At" disabled />
              </Stack>
            )}

            {canEdit && (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create user' : 'Save changes'}
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
      <UpdatePassword
        currentUser={currentUser}
        open={passwordShow.value}
        onClose={passwordShow.onFalse}
      />
    </Form>
  );
}
const UpdatePassword = ({ currentUser, open, onClose }) => {
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      password: '',
    }),
    [currentUser]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(
      zod.object({
        password: zod.string().min(6, { message: 'Password must be at least 6 characters long!' }),
      })
    ),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedBy = jwtDecode(sessionStorage.getItem('jwt_access_token')).id;
      const formData = new FormData();
      data = {
        ...data,
        user_id: currentUser._id,
        updatedBy: updatedBy,
      };

      await axios
        .post(endpoints.users.updatePassword, data)
        .then((response) => {
          reset();
          toast.success(response.data.message);
          refreshUser(currentUser._id);
          router.push(paths.dashboard.users.root);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'An error occurred during form submission');
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Update Password</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Field.Text
              name="password"
              label="Password"
              placeholder="6+ characters"
              type="password"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
