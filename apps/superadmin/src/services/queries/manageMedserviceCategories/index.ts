import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import apiMethods from '../../api';
import { IMedserviceCategory } from './types';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';

/**
 * @description get all medservice categories
 * @param url
 * @param options
 * @param pageNumber
 * @returns
 */
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
    queryFn: () => apiMethods.get({ url }).then((res: ApiResponse) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const useGetMedserviceCategoryById = (
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
  }: UseQueryResult<ApiResponse<IMedserviceCategory>, unknown> = useQuery({
    queryKey: hash,
    queryFn: () => apiMethods.get({ url }).then((res: ApiResponse) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const useCreateMedserviceCategory = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      return apiMethods.post({
        url: '/service-manager/medServiceCategory/createmedservicecategory',
        body: data,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.getAll] });
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, cb: () => void) => {
      return mutate(bodyArg, {
        onSuccess: () => {
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

const useUpdateMedserviceCategory = (id: string, options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.update],
    mutationFn: async (data: any) => {
      return apiMethods.put({
        url: `/service-manager/medServiceCategory/editservicecategory/${id}`,
        body: data,
        // auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.getAll] });
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, cb: () => void) => {
      return mutate(bodyArg, {
        onSuccess: () => {
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

const useDeleteMedserviceCategory = (id: string, options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.update],
    mutationFn: async () => {
      return apiMethods.delete({
        url: `/service-manager/medServiceCategory/deletemedcategory/${id}`,
        body: {},
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.getAll] });
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, cb: () => void) => {
      return mutate(bodyArg, {
        onSuccess: () => {
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
  useGetAllMedserviceCategories,
  useCreateMedserviceCategory,
  useGetMedserviceCategoryById,
  useUpdateMedserviceCategory,
  useDeleteMedserviceCategory,
};

export default queries;
