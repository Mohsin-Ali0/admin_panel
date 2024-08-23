import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetContent(contentType) {
  const url = contentType ? [endpoints.configuration.getConfig, { params: { contentType } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      content: data?.data,
      contentLoading: isLoading,
      contentError: error,
      contentValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetRevenue() {
  const url = [endpoints.configuration.getRevenue];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      revenue: data?.data,
      revenueLoading: isLoading,
      revenueError: error,
      revenueValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetCustomCampaignDetails() {
  const url = [endpoints.configuration.getCustomCampaign];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      customCampaign: data?.data,
      customCampaignLoading: isLoading,
      customCampaignError: error,
      customCampaignValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
