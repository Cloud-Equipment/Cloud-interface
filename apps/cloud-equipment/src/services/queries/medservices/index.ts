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

// url: `/service-manager/medServices/getall`

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
};

export default queries;
