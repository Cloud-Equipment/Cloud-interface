import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';

import { IDashboardSummary, IReceptionistDashboardSummary } from './types';
import { apiClient } from '@cloud-equipment/api';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';
import { environment } from '@cloud-equipment/environments';

const useGetDashboardSummary_FacilityAdmin = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [keys.read];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<IDashboardSummary> = useQuery({
    queryKey: hash,
    queryFn: () => apiClient.get({ url }).then((res: ApiResponse) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const useGetDashboardSummary_Receptionist = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [keys.read];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<IReceptionistDashboardSummary> = useQuery({
    queryKey: hash,
    queryFn: () => apiClient.get({ url }).then((res: ApiResponse) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const queries = {
  useGetDashboardSummary_FacilityAdmin,
  useGetDashboardSummary_Receptionist,
};

export default queries;
