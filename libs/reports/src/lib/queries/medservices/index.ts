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
import { environment } from '@cloud-equipment/environments';
import { IMedservice } from '@cloud-equipment/models';

const useGetMedservicesForFacility = (
  body: {
    facilityId: string;
    download: boolean;
    currentPage: number;
    startIndex: number;
    pageSize: number;
  },
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const { facilityId, download, currentPage, startIndex, pageSize } = body;
  const hash = [
    keys.read,
    facilityId,
    download,
    currentPage,
    startIndex,
    pageSize,
  ];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<PaginationData<IMedservice>> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiClient
        .post({
          url: `${environment.baseUrl}/service-manager/medServices/getallbyfacilitypaged`,
          params: { facilityId },
          body: {
            download,
            currentPage,
            startIndex,
            pageSize,
          },
          auth: true,
        })
        .then((res: ApiResponse) => res.data),
  });
  return { isLoading, data, isSuccess, error };
};

const queries = {
  useGetMedservicesForFacility,
};

export default queries;
