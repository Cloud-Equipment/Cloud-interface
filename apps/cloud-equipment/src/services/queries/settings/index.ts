import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import apiMethods from '../../api';
import { ISettings } from './types';
import { ApiResponse, PaginationData } from 'Models/api.models';
import keys from './keys';
import { showToast } from '@cloud-equipment/utils';

const useGetSettings = (
  url: string,
  body: any,
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
  }: UseQueryResult<ISettings, unknown> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiMethods
        .post({
          url,
          body,
          auth: true,
          config: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        })
        .then((res: ApiResponse) => res.data),
    ...options,
  });
  return { isLoading, data, isSuccess, error };
};

const useUpdateUserSettings = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      const { id } = data;
      return apiMethods.patch({
        url: `/user-manager/account/user/update?userId=${id}`,
        body: data,
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
          showToast(
            res.message || 'User details updated Successfully',
            'success'
          );
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
  useGetSettings,
  useUpdateUserSettings,
};

export default queries;
