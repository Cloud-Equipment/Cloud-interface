import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import { apiClient } from '@cloud-equipment/api';
import { ApiResponse, PaginationData } from 'Models/api.models';
import keys from './keys';
import { IMedservice } from '@cloud-equipment/models';

// url: `/service-manager/medServices/getall`
const useGetPrices = (
  url: string,
  body: any,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {},
  pageNumber: string = '1'
) => {
  const hash = [keys.read, 'all', `${pageNumber}`];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<PaginationData<IMedservice>, unknown> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiClient
        .post({ url, body, auth: true })
        .then((res: ApiResponse<PaginationData<IMedservice>>) => res.data),
    ...options,
  });
  return { isLoading, data, isSuccess, error };
};

const useGetMedservicesForFacility = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [keys.read];
  const { isLoading, data, isSuccess, error }: UseQueryResult<IMedservice[]> =
    useQuery({
      queryKey: hash,
      queryFn: () =>
        apiClient.get({ url }).then((res: ApiResponse) => res.data),
    });
  return { isLoading, data, isSuccess, error };
};

const queries = {
  useGetMedservicesForFacility,
  useGetPrices
};

export default queries;
