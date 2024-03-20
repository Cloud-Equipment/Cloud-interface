import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import apiMethods from '../../api';
import { IPatient } from './types';
import { ApiResponse, PaginationData } from 'Models/api.models';
import keys from './keys';
import { showToast } from '@cloud-equipment/utils';
import { apiClient } from '@cloud-equipment/api';
import { environment } from '@cloud-equipment/environments';

const useGetPatients = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {},
  pageNumber = { currentPage: 1, pageSize: 10 }
) => {
  const hash = [
    keys.read,
    `${pageNumber.currentPage}`,
    `${pageNumber.pageSize}`,
  ];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<PaginationData<IPatient>, unknown> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiMethods
        .get({ url, auth: true })
        .then((res: ApiResponse<PaginationData<IPatient>>) => res.data),
    ...options,
  });
  return { isLoading, data, isSuccess, error };
};

const useCreatePatient = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any | IPatient) => {
      return apiMethods.post({
        url: `/patient/createpatient`,
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
    mutateFn: (bodyArg: any | IPatient, successCb: (res: any) => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          showToast(res.message || 'Patient Created Successfully', 'success');
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

const useEditPatient = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: IPatient) => {
      const { patientUniqueID } = data;
      return apiMethods.post({
        url: `/patient/updatepatient/${patientUniqueID}`,
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
    mutateFn: (bodyArg: IPatient, successCb: (res: any) => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          showToast(res.message || 'Patient Updated Successfully', 'success');
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

const useGetPatientById = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [keys.readOne];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<IPatient, unknown> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiMethods
        .get({ url, auth: true })
        .then((res: ApiResponse<IPatient>) => res.data),
    ...options,
  });
  return { isLoading, data, isSuccess, error };
};

const useGetPatientReport = (
  url: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [keys.customkey('report', 'read')];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<PaginationData<IPatient>, unknown> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiMethods
        .get({ url, auth: true })
        .then((res: ApiResponse<PaginationData<IPatient>>) => res.data),
    ...options,
  });
  return { isLoading, data, isSuccess, error };
};

const useSearchPatientByName = (
  patientName: string,
  facilityId: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {}
) => {
  const hash = [`${keys.searchCustom}`, patientName];
  const { isLoading, data, isSuccess, error }: UseQueryResult<any[]> = useQuery(
    {
      queryKey: hash,
      queryFn: () => {
        if (!patientName) {
          return null;
        }
        return apiClient
          .get({
            url: `${environment.baseUrl}/patient/getpatientbyname`,
            auth: true,
            params: { patientName, facilityId },
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
  useGetPatients,
  useCreatePatient,
  useGetPatientById,
  useEditPatient,
  useSearchPatientByName,
  useGetPatientReport,
};

export default queries;
