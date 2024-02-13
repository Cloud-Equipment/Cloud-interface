import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import { apiClient } from '@cloud-equipment/api';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';
import { environment } from '@cloud-equipment/environments';
import { IMedservice } from '@cloud-equipment/models';

const useGetMedservicesForFacility = (facilityId: string, options = {}) => {
  const mutation = useMutation({
    ...options,
    mutationKey: [keys.getAll],
    mutationFn: async () => {
      const response = await apiClient.get({
        url: `/service-manager/medServices/getall`,
        auth: true,
      });

      return response.data;
    },
    // mutationFn: async () => {
    //   const response = await apiClient.post({
    //     url: `/service-manager/medServices/getallbyfacilitypaged?facilityId=${facilityId}`,
    //     auth: true,
    //     body: {
    //       currentPage: 1,
    //       startIndex: 1,
    //       pageSize: 200,
    //     },
    //   });
    //   return response.data;
    // },
    onSuccess: () => {},
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, cb: (res: any) => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          cb?.(res);
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
  useGetMedservicesForFacility,
};

export default queries;
