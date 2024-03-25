import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';

import {
  IChartResponse,
  IDashboardSummary,
  IReceptionistDashboardSummary,
} from './types';
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

const useGetDashboardCharts_FacilityAdmin = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [keys.searchCustom, 'Chart'];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<{
    patientActivity: {
      labels: string[];
      data: number[];
    };
    montlyEarning: { labels: string[]; data: number[] };
  }> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiClient.get({ url }).then((res: ApiResponse<IChartResponse>) => {
        return {
          patientActivity: {
            labels: res.data?.patientActivity?.map((x) => x.months) ?? [],
            data: res.data?.patientActivity?.map((x) => x.visits) ?? [],
          },
          montlyEarning: {
            labels: res.data?.montlyEarning?.map((x) => x.months) ?? [],
            data: res.data?.montlyEarning?.map((x) => x.earnings) ?? [],
          },
        };
      }),
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
  useGetDashboardCharts_FacilityAdmin,
  useGetDashboardSummary_Receptionist,
};

export default queries;
