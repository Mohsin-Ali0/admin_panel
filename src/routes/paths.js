// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    roles: {
      root: `${ROOTS.DASHBOARD}/roles`,
      createRole: `${ROOTS.DASHBOARD}/roles/create-role`,
      edit: (id) => `${ROOTS.DASHBOARD}/roles/${id}/edit`,
    },
    users: {
      root: `${ROOTS.DASHBOARD}/users`,
      createUser: `${ROOTS.DASHBOARD}/users/create-user`,
      edit: (id) => `${ROOTS.DASHBOARD}/users/${id}/edit`,
    },
    customers: {
      root: `${ROOTS.DASHBOARD}/customers`,
      createCustomer: `${ROOTS.DASHBOARD}/customers/create-customer`,
      edit: (id) => `${ROOTS.DASHBOARD}/customers/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/customers/${id}/details`,
    },
    customCampaigns: {
      root: `${ROOTS.DASHBOARD}/custom-campaigns`,
      createCampaign: `${ROOTS.DASHBOARD}/custom-campaigns/create-campaign`,
    },
    configuration: {
      root: `${ROOTS.DASHBOARD}/system-managment`,
      privacyPolicy: `${ROOTS.DASHBOARD}/system-managment/privacy-and-policy-managment`,
      termsandServices: `${ROOTS.DASHBOARD}/system-managment/terms-and-condition-managment`,
      systemConfiguration: `${ROOTS.DASHBOARD}/system-managment/system-configuration`,
    },
  },
};
