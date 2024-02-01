import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import apiMethods from '../../api';
import { IMedservice } from './types';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';

const useGetMedservice = (
  url: string,
  body: { currentPage: number; startIndex: number; pageSize: number },
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
  }: UseQueryResult<ApiResponse<IMedservice>, unknown> = useQuery({
    queryKey: hash,
    queryFn: () => apiMethods.get({ url }).then((res: ApiResponse) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const useGetMedserviceById = (
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
  }: UseQueryResult<ApiResponse<IMedservice>, unknown> = useQuery({
    queryKey: hash,
    queryFn: () => apiMethods.get({ url }).then((res: ApiResponse) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const useCreateMedservice = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      return apiMethods.post({
        url: '/service-manager/medServices/createservice',
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
    mutateFn: (bodyArg: any, cb: () => void) => {
      return mutate(bodyArg, {
        onSuccess: () => {
          // console.log('sdnfsdfsdfsdfsdfsd')
          cb?.();
        },
      });
    },
    data,
    isSuccess,
    isError,
    isLoading: isPending,
  };
};

const useApproveMedservice = (url: string, options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.update],
    mutationFn: async (data: any) => {
      return apiMethods.post({
        url,
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
    mutateFn: (bodyArg: any, cb: () => void) => {
      return mutate(bodyArg, {
        onSuccess: () => {
          // console.log('sdnfsdfsdfsdfsdfsd')
          cb?.();
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
  useGetMedservice,
  useCreateMedservice,
  useGetMedserviceById,
  useApproveMedservice,
};

export default queries;
