import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import apiMethods from '../../api';
import { IPatient } from './types';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';
import { showToast } from '../../../utils/toast';

const useGetPatients = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {},

  pageNumber: string = '1'
) => {
  const hash = [keys.read, `${pageNumber}`];
  const { isLoading, data, isSuccess, error }: UseQueryResult<IPatient[]> =
    useQuery({
      queryKey: hash,
      queryFn: () =>
        apiMethods.get({ url }).then((res: ApiResponse) => res.data),
    });
  return { isLoading, data, isSuccess, error };
};

const useGetOnePatient = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [keys.read];
  const { isLoading, data, isSuccess, error }: UseQueryResult<IPatient> =
    useQuery({
      queryKey: hash,
      queryFn: () =>
        apiMethods.get({ url }).then((res: ApiResponse) => res.data),
    });
  return { isLoading, data, isSuccess, error };
};

const useCreatePatient = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      return apiMethods.post({
        url: '/patient/createpatient',
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
          showToast('Patient Created Successfully', 'success');
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
  useGetPatients,
  useCreatePatient,
  useGetOnePatient,
};

export default queries;
