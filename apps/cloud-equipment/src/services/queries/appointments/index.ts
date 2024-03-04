import {
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { apiClient } from '@cloud-equipment/api';
import keys from './keys';
import { ApiResponse, PaginationData } from 'Models/api.models';
import { IAppointment } from './types';
import dayjs from 'dayjs';

const useCreateAppointment = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      return apiClient.post({
        url: '/facility-manager/facility/createappointment',
        body: data,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.read] });
      queryClient.invalidateQueries({ queryKey: [`${keys.read}calendar`] });
      queryClient.invalidateQueries({ queryKey: [`${keys.read}upcoming`] });
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

const useGetAppointmentsDaily = (
  url: string,
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
  }: UseQueryResult<PaginationData<IAppointment>> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiClient
        .get({ url })
        .then((res: ApiResponse<PaginationData<IAppointment>>) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const useGetUpcomingAppointments = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [`${keys.read}upcoming`];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<PaginationData<IAppointment>> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiClient
        .get({ url })
        .then((res: ApiResponse<PaginationData<IAppointment>>) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const useGetCalendarAppointments = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [`${keys.read}calendar`];
  const {
    isLoading,
    isSuccess,
    error,
    data,
  }: UseQueryResult<{ _data: IAppointment[]; highlightedDays: number[] }> =
    useQuery({
      queryKey: hash,
      queryFn: () =>
        apiClient
          .get({ url })
          .then((res: ApiResponse<PaginationData<IAppointment>>) => {
            //
            const highlightedDays: number[] = [];
            res.data.resultItem.forEach((x) => {
              highlightedDays.push(dayjs(x.appointmentDate).date());
            });

            return { _data: res.data.resultItem, highlightedDays };
          }),
    });
  return { isLoading, data, isSuccess, error };
};

const queries = {
  useCreateAppointment,
  useGetAppointmentsDaily,
  useGetUpcomingAppointments,
  useGetCalendarAppointments,
};

export default queries;
