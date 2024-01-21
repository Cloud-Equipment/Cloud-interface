import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import apiMethods from '../../api';
import { Facility, FacilityUser } from './types';
import { ApiResponse, PaginationData } from 'Models/api.models';
import keys from './keys';
import { environment } from '@cloud-equipment/environments';
import { showToast } from '../../../utils/toast';

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

const useGetAllFacilities = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [keys.getAll];
  const { isLoading, data, isSuccess, error }: UseQueryResult<Facility[]> =
    useQuery({
      queryKey: hash,
      queryFn: () => apiMethods.get({ url }).then((res) => res.data),
    });
  return { isLoading, data, isSuccess, error };
};

const useCreateFacility = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
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
    mutateFn: (bodyArg: any, successCb: () => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          showToast('Facility Created Successfully', 'success');
          setTimeout(() => {
            successCb();
          }, 1500);
        },
      });
    },
    data,
    isSuccess,
    isError,
    isLoading: isPending,
  };
};

const useGetFacilityUser = (
  url: string,
  body: any,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {},
  pageNumber: string = '1'
) => {
  const hash = [keys.read, 'users', `${pageNumber}`];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<PaginationData<FacilityUser>, unknown> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiMethods
        .post({ url, body, auth: true })
        .then((res: ApiResponse<PaginationData<FacilityUser>>) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const useCreateUser = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      return apiMethods.post({
        url: '/user-manager/account/user/register',
        body: data,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.read, 'users'] });
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, successCb: () => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          showToast('User Created Successfully', 'success');
          setTimeout(() => {
            successCb?.();
          }, 1500);
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
  useCreateUser,
  useGetFacilityUser,
  useGetAllFacilities,
};

export default queries;
