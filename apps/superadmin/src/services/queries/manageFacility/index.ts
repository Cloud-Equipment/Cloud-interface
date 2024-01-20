import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import apiMethods from '../../api';
import { Facility } from './types';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';
import { environment } from '@cloud-equipment/environments';

const { baseUrl } = environment;
// /api/facility-manager/getallfacilities

/**
 * @description get all facilities
 * @param url
 * @param options
 * @param pageNumber
 * @returns
 */
const useGetFacilities = (
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
  }: UseQueryResult<ApiResponse<Facility>, unknown> = useQuery({
    queryKey: hash,
    queryFn: () => apiMethods.get({ url }).then((res: ApiResponse) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const useCreateFacility = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      console.log('data in mutation', data);
      return apiMethods.post({
        url: '/api/facility-manager/createfacility',
        body: data,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.read] });
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any) => {
      return mutate(bodyArg, {
        onSuccess: () => {
          console.log('success from mutate');
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
  useGetFacilities,
  useCreateFacility,
  // useGetOrder,
};

export default queries;
