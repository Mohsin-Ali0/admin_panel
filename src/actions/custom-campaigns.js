import useSWR from 'swr';
import { useCallback, useMemo, useState } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetchannels() {
  const url = endpoints.customCampaigns.getchannels;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      channels: data?.channels || [],
      channelsLoading: isLoading,
      channelsError: error,
      channelsValidating: isValidating,
      channelsEmpty: !isLoading && !data?.channels.length,
    }),
    [data?.channels, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export const useChannels = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChannels = useCallback(async (url, body) => {
    setLoading(true);
    setError(null);
    console.log(url, body, 'url, body');
    try {
      const response = await axios.post(url, { url: body });
      if (response.data.status === 200) {
        return response.data.data; // Assuming channels data is in response.data.data
      } else {
        setError(response.data.messege || 'Error fetching channels');
        return [];
      }
    } catch (err) {
      setError(err.message || 'Error fetching channels');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchChannels, loading, error };
};
// ----------------------------------------------------------------------

export function useGetvideos(channelId) {
  //   const url = channelId ? [endpoints.videoss.getbyId, { params: { channelId } }] : '';
  console.log(channelId, 'channelId');
  const url = channelId ? [endpoints.videos.getbyId + `/${channelId}`] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      videos: data?.data,
      videosLoading: isLoading,
      videosError: error,
      videosValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchcustomer(query) {
  const url = query ? [endpoints.customer.search, { params: { query } }] : '';

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
