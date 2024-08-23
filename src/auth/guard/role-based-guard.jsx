import { m } from 'framer-motion';
import { useContext } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { LoadingScreen } from 'src/components/loading-screen';
import { varBounce, MotionContainer } from 'src/components/animate';

import { jwtDecode } from '../context/jwt';
import { AuthContext } from '../context/auth-context';

// ----------------------------------------------------------------------

export const RoleBasedGuard = ({ resource, action, element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />; // Show loading screen while checking permissions
  }
  const rolesData = jwtDecode(user.accessToken).AllowedScreens;
  const hasPermission = rolesData?.[resource]?.[action];

  if (!hasPermission) {
    return <AccessDenied />; // Redirect to 404 or a custom unauthorized page
  }

  return element;
};

export const AccessDenied = () => (
  <Container component={MotionContainer} sx={{ textAlign: 'center', alignSelf: 'center' }}>
    hello there
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
