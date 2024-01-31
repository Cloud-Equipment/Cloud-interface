import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import apiMethods from '../../api';
import { ISettings } from './types';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';
import { showToast } from '../../../utils/toast';

const useGetSettings = (
  url: string,
  body?: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [keys.read];
  const { isLoading, data, isSuccess, error }: UseQueryResult<ISettings> =
    useQuery({
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
    });
  return { isLoading, data, isSuccess, error };
};

const useUpdateSettings = (options = {}, id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: ISettings) => {
      return apiMethods.patch({
        url: `/user-manager/account/ceuser/update?userId=${id}`,
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.read] });
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: ISettings, successCb: () => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          console.log('res', res);
          showToast('Settings Updated Successfully', 'success');
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
  useUpdateSettings,
};

export default queries;
