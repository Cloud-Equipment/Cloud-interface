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

// const useGetOrder = (
//   options: Omit<
//     UseQueryOptions<any, unknown, any, string[]>,
//     "initialData" | "queryFn" | "queryKey"
//   > = {},
//   id?: string,
// ) => {
//   const hash = [keys.read, `${id}`];
//   const {
//     isLoading,
//     data,
//     isSuccess,
//     error,
//     ...rest
//   }: UseQueryResult<ORDER_API_RESPONSE, unknown> = useQuery(
//     hash,
//     () => apiMethods.get({ url: `${baseUrl}/orders/${id}` }),
//     {
//       ...options,
//       onSuccess: () => {},
//       onError: () => {},
//     },
//   );
//   return { isLoading, data, isSuccess, error, ...rest };
// };

// const useUpdateOrderStatus = (options = {}) => {
//   const queryClient = useQueryClient();

//   const { mutate, isLoading, data, isSuccess } = useMutation(apiMethods.patch, {
//     ...options,
//     mutationKey: [keys.create],
//     onSuccess: () => {
//       queryClient.invalidateQueries([keys.read]);
//     },
//     onError: () => {},
//   });

//   return {
//     mutate: (bodyArg: { status: StatusTypes; id: string }) => {
//       const { status, id } = bodyArg;
//       const body = {
//         status: status,
//       };
//       return mutate({
//         url: `${baseUrl}/orders/${id}/${statusObject?.route}`,
//         body,
//       });
//     },
//     isLoading,
//     data,
//     isSuccess,
//   };
// };

const queries = {
  useGetFacilities,
  // useUpdateOrderStatus,
  // useGetOrder,
};

export default queries;
