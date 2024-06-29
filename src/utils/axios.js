import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    // me: '/api/auth/me',
    // signIn: '/api/auth/sign-in',
    signIn: '/api/admin/auth/signin',
    signUp: '/api/auth/sign-up',
  },
  roles: {
    list: '/api/admin/auth/getAllRoles',
    create: '/api/admin/auth/createRole',
    status_update: '/api/admin/auth/updateStatus',
    getbyId: '/api/admin/auth/getRoleById',
    update: '/api/admin/auth/updateRole',
    activeRoles: '/api/admin/auth/getActiveRoles',
  },
  users: {
    list: '/api/admin/user/getUsers',
    create: '/api/admin/user/createUser',
    status_update: '/api/admin/user/updateUserStatus',
    getbyId: '/api/admin/user/getUserById',
    update: '/api/admin/user/updateUser',
    search: '/api/post/search',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
