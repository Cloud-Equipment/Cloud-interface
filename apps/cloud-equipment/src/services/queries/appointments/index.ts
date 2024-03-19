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

const useCreateAppointment = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      return apiClient.post({
        url: '/service-manager/procedures/create',
        body: data,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.read] });
      queryClient.invalidateQueries({ queryKey: [`${keys.read}_upcoming`] });
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
  params: { [key: string]: string | number },
  isReceptionist: boolean,
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
  }: UseQueryResult<PaginationData<any>> = useQuery({
    queryKey: hash,
    queryFn: () => {
      let url = '';
      if (!isReceptionist) {
        url = '/service-manager/procedures/getdailyentry';
      } else {
        url = '/service-manager/procedures/getallbyfacility';
      }
      return apiClient
        .get({
          url,
          params: { ...params },
        })
        .then((res: ApiResponse<PaginationData<IAppointment>>) => res.data);
    },
  });
  return { isLoading, data, isSuccess, error };
};

const useGetUpcomingAppointments = (
  params: { [key: string]: string | number },
  isReceptionist: boolean,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [`${keys.read}_upcoming`, params];
  const { isLoading, data, isSuccess, error }: UseQueryResult<any[]> = useQuery(
    {
      queryKey: hash,
      queryFn: () => {
        let url = '';
        if (isReceptionist) {
          url = '/service-manager/procedures/getdailyentry';
        } else {
          url = '/service-manager/procedures/getallbyfacility';
        }
        return apiClient
          .get({
            url,
            params: { ...params },
          })
          .then(
            (res: ApiResponse<PaginationData<IAppointment>>) =>
              res.data?.resultItem ?? []
          );
      },
    }
  );
  return { isLoading, data, isSuccess, error };
};

// const useGetCalendarAppointments = (
//   url: string,
//   options: Omit<
//     UseQueryOptions<any, unknown, any, string[]>,
//     'initialData' | 'queryFn' | 'queryKey'
//   > = {}
// ) => {
//   const hash = [`${keys.read}calendar`];
//   const {
//     isLoading,
//     isSuccess,
//     error,
//     data,
//   }: UseQueryResult<{ _data: IAppointment[]; highlightedDays: number[] }> =
//     useQuery({
//       queryKey: hash,
//       queryFn: () =>
//         apiClient
//           .get({ url })
//           .then((res: ApiResponse<PaginationData<IAppointment>>) => {
//             //
//             const highlightedDays: number[] = [];
//             res.data.resultItem.forEach((x) => {
//               highlightedDays.push(dayjs(x.appointmentDate).date());
//             });

//             return { _data: res.data.resultItem, highlightedDays };
//           }),
//     });
//   return { isLoading, data, isSuccess, error };
// };

const queries = {
  useCreateAppointment,
  useGetAppointmentsDaily,
  useGetUpcomingAppointments,
  // useGetCalendarAppointments,
};

export default queries;
