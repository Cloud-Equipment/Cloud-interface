import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import apiMethods from '../../api';
import { IDiscount } from './types';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';

const useGetDiscounts = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {},

  pageNumber: string = '1'
) => {
  const hash = [keys.read, `${pageNumber}`];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<ApiResponse<IDiscount[]>, unknown> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiMethods.get({ url }).then((res: ApiResponse) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const queries = {
  useGetDiscounts,
};

export default queries;
