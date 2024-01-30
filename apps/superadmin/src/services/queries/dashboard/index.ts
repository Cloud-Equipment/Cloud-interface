import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';

import apiMethods from '../../api';
import { IDashboardSummary } from './types';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';

const useGetDashboardSummary = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [keys.read];
  const { isLoading, data, isSuccess, error }: UseQueryResult<IDashboardSummary> =
    useQuery({
      queryKey: hash,
      queryFn: () =>
        apiMethods.get({ url }).then((res: ApiResponse) => res.data),
    });
  return { isLoading, data, isSuccess, error };
};

const queries = {
  useGetDashboardSummary,
};

export default queries;
