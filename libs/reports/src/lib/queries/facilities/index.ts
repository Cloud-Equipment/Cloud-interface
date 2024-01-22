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
import { environment } from '@cloud-equipment/environments';
import { IFacility } from '@cloud-equipment/models';

interface TableQueryParams {
  currentPage: number;
  startIndex: number;
  pageSize: number;
}

const useGetAllFacilities = (options = {}) => {
  const mutation = useMutation({
    ...options,
    mutationKey: [keys.getAll],
    mutationFn: async () => {
      const response = await apiClient.get({
        url: `/api/facility-manager/getallfacilities`,
        auth: true,
      });

      return response.data;
    },
    onSuccess: () => {},
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, cb: (res: any) => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          cb?.(res);
        },
      });
    },
    data,
    isSuccess,
    isError,
    isLoading: isPending,
  };
};

const queries = {
  useGetAllFacilities,
};

export default queries;
