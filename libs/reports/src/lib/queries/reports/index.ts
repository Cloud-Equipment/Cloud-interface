import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import { apiClient } from '@cloud-equipment/api';
import { IProcedure } from './types';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';
import { environment } from '@cloud-equipment/environments';

interface TableQueryParams {
  currentPage: number;
  startIndex: number;
  pageSize: number;
}

const useGetReports = (
  _params: TableQueryParams,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {},
  pageNumber: string = '1'
) => {
  const hash = [keys.read, `${pageNumber}`];
  const url = `${environment.baseUrl}/service-manager/procedures/getAllPaged`;

  const { isLoading, data, isSuccess, error }: UseQueryResult<IProcedure[]> =
    useQuery({
      queryKey: hash,
      queryFn: () =>
        apiClient
          .get({ url, params: _params })
          .then((res: ApiResponse) => res.data.resultItem),
    });

  return { isLoading, data, isSuccess, error };
};

const useGetReportById = (
  id: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {},
  pageNumber: string = '1'
) => {
  const hash = [keys.read, `${pageNumber}`];
  const url = `${environment.baseUrl}/service-manager/procedures/get/${id}`;

  const { isLoading, data, isSuccess, error }: UseQueryResult<IProcedure> =
    useQuery({
      queryKey: hash,
      queryFn: () =>
        apiClient.get({ url }).then((res: ApiResponse) => res.data),
    });

  return { isLoading, data, isSuccess, error };
};

const queries = {
  useGetReports,
  useGetReportById,
};

export default queries;
