import {
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { apiClient } from '@cloud-equipment/api';
import keys from './keys';
import { ApiResponse } from 'Models/api.models';
import { IReferer, IRefererCreate } from './types';
import { showToast } from '@cloud-equipment/utils';

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
          .get({
            url: '/api/v1/doctor-manager/search-referer-byname',
            params: { referername: name },
            auth: true,
          })
          .then((res: ApiResponse<IReferer[]>) => {
            return res.data;
          });
      },
    }
  );
  return { isLoading, data, isSuccess, error };
};

const useCreateReferer = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: IRefererCreate) => {
      return apiClient.post({
        url: `/api/v1/doctor-manager/create-referer`,
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
    mutateFn: (bodyArg: IRefererCreate, successCb: (res: any) => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          showToast(res.message || 'Referer Created Successfully', 'success');
          setTimeout(() => {
            successCb?.(res);
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
  useSearchRefererByName,
  useCreateReferer,
};

export default queries;
