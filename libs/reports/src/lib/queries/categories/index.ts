import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import { apiClient } from '@cloud-equipment/api';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';
import { IMedserviceCategory } from '@cloud-equipment/models';

const useGetAllMedserviceCategories = (
    url: string,
    options: Omit<
      UseQueryOptions<any, unknown, any, string[]>,
      'initialData' | 'queryFn' | 'queryKey'
    > = {}
  ) => {
    const hash = [keys.getAll];
    const {
      isLoading,
      data,
      isSuccess,
      error,
    }: UseQueryResult<IMedserviceCategory[]> = useQuery({
      queryKey: hash,
      queryFn: () => apiClient.get({ url }).then((res: ApiResponse) => res.data),
    });
    return { isLoading, data, isSuccess, error };
  };

const queries = {
    useGetAllMedserviceCategories,
};

export default queries;
