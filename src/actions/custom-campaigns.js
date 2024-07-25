import useSWR from 'swr';
import { useCallback, useMemo, useState } from 'react';

import axios, { fetcher, endpoints, fetcherPost } from 'src/utils/axios';

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

export const useManualVideos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideos = useCallback(async (url, body) => {
    setLoading(true);
    setError(null);
    console.log(url, body, 'url, body');
    try {
      const response = await axios.post(url, body);
      if (response.data.status === 200) {
        return response.data.data.videos; // Assuming VidefetchVideos data is in response.data.data
      } else {
        setError(response.data.messege || 'Error fetching Videos');
        return [];
      }
    } catch (err) {
      setError(err.message || 'Error fetching Videos');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchVideos, loading, error };
};
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

// export const useGetVideos = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchVideos = useCallback(async (url, body) => {
//     setLoading(true);
//     setError(null);
//     console.log(url, body, 'url, body');
//     try {
//       const response = await axios.post(url, { url: body });
//       if (response.data.status === 200) {
//         return response.data.data; // Assuming videos data is in response.data.data
//       } else {
//         setError(response.data.messege || 'Error fetching videos');
//         return [];
//       }
//     } catch (err) {
//       setError(err.message || 'Error fetching videos');
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { fetchVideos, loading, error };
// };

// ----------------------------------------------------------------------

export function useGetvideos(channelId, SelectedType, SearchBody) {
  console.log(SearchBody, 'SearchBody');
  const url = channelId
    ? [endpoints.customCampaigns.getvideos, { channelId, type: SelectedType, SearchBody }]
    : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcherPost, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      videos: data?.data.videos || [],
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
