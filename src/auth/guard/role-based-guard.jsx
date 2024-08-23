import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { LoadingScreen } from 'src/components/loading-screen';
import { Navigate } from 'react-router';
import { jwtDecode } from '../context/jwt';

// ----------------------------------------------------------------------

export const RoleBasedGuard = ({ resource, action, element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />; // Show loading screen while checking permissions
  }
  let rolesData = jwtDecode(user.accessToken).AllowedScreens;
  const hasPermission = rolesData?.[resource]?.[action];

  if (!hasPermission) {
    return <AccessDenied />; // Redirect to 404 or a custom unauthorized page
  }

  return element;
};

export const AccessDenied = () => {
  return (
    <Container component={MotionContainer} sx={{ textAlign: 'center', alignSelf: 'center' }}>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Permission denied
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          You do not have permission to access this page.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
      </m.div>
    </Container>
  );
};
