import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import { apiClient } from '@cloud-equipment/api';
import { IProcedure } from './types';
import { ApiResponse } from 'Models/api.models';
import keys from './keys';
import { environment } from '@cloud-equipment/environments';
import { showToast } from '@cloud-equipment/utils';

interface TableQueryParams {
  currentPage: number;
  startIndex: number;
  pageSize: number;
}

const useCreateReport = (options = {}) => {
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

const useGetReports = (
  _params: TableQueryParams & { download: boolean },
  facilityId: string | null,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {},
  pageNumber: string = '1'
) => {
  const hash = [keys.read, `${pageNumber}`, _params];
  let url = '';
  if (!facilityId) {
    url = `${environment.baseUrl}/service-manager/procedures/getAllPaged`;
  } else {
    url = '/service-manager/procedures/getallbyfacility';
  }

  const { isLoading, data, isSuccess, error }: UseQueryResult<IProcedure[]> =
    useQuery({
      queryKey: hash,
      queryFn: () =>
        apiClient
          .get({ url, params: { facilityId, ..._params } })
          .then((res: ApiResponse) => res.data.resultItem),
    });

  return { isLoading, data, isSuccess, error };
};

const useGetReportById = (
  id: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {},
  pageNumber: string = '1'
) => {
  const hash = [keys.read, `${pageNumber}`];
  const url = `${environment.baseUrl}/service-manager/procedures/get/${id}`;

  const { isLoading, data, isSuccess, error }: UseQueryResult<IProcedure> =
    useQuery({
      queryKey: hash,
      queryFn: () =>
        apiClient.get({ url }).then((res: ApiResponse) => res.data),
    });

  return { isLoading, data, isSuccess, error };
};

const useConfirmTest = (options = {}) => {
  const mutation = useMutation({
    ...options,
    mutationKey: [keys.getAll],
    mutationFn: async (body: any) => {
      const response = await apiClient.patch({
        url: `/service-manager/procedures/validateprocedure`,
        body: {
          procedureEntrId: body?.procedureEntrId,
          procedureNewStatus: body?.procedureNewStatus,
        },
      });

      return response;
    },
    onSuccess: (res) => {
      showToast(res?.message, 'success');
    },
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

const useUploadResult = (options = {}) => {
  const mutation = useMutation({
    ...options,
    mutationKey: [keys.getAll],
    mutationFn: async (body: any) => {
      const response = await apiClient.post({
        url: `/service-manager/procedures/upload-result?procedureEntryId=${body?.procedureEntryId}`,
        auth: true,
        body: body,
      });

      return response;
    },
    onSuccess: (res) => {
      showToast(res?.message, 'success');
    },
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
  useGetReports,
  useGetReportById,
  useConfirmTest,
  useUploadResult,
  useCreateReport,
};

export default queries;
