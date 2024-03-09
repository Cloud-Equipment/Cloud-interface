import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { apiClient } from '@cloud-equipment/api';
import keys from './keys';
import { ApiResponse } from 'Models/api.models';

const useSearchRefererByName = (
  name: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [`${keys.searchCustom}`, name];
  const { isLoading, data, isSuccess, error }: UseQueryResult<any[]> = useQuery(
    {
      queryKey: hash,
      queryFn: () => {
        if (!name) {
          return null;
        }
        return apiClient
          .post({
            url: '/api/v1/doctor-manager/search-referer',
            body: { refererDoctorName: name },
            auth: true,
          })
          .then((res: ApiResponse<any[]>) => {
            return res.data;
          });
      },
    }
  );
  return { isLoading, data, isSuccess, error };
};

const queries = {
  useSearchRefererByName,
};

export default queries;
