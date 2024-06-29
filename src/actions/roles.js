import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

// ----------------------------------------------------------------------

export function useGetRoles() {
  const url = endpoints.roles.list;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      roles: data?.roles || [],
      rolesLoading: isLoading,
      rolesError: error,
      rolesValidating: isValidating,
      rolesEmpty: !isLoading && !data?.roles.length,
    }),
    [data?.roles, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetRole(roleId) {
  console.log(roleId, 'useGetRole :roleId');
  //   const url = roleId ? [endpoints.roles.getbyId, { params: { roleId } }] : '';
  const url = roleId ? [endpoints.roles.getbyId + `/${roleId}`] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);
  console.log(data, 'data', isLoading, 'isLoading', error, 'error', isValidating, 'isValidating');
  const memoizedValue = useMemo(
    () => ({
      role: data?.data,
      roleLoading: isLoading,
      roleError: error,
      roleValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchRole(query) {
  const url = query ? [endpoints.roles.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
