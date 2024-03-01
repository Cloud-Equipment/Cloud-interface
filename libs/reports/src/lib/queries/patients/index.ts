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
import { IPatient } from 'Models/patient.models';

const useSearchPatientByName = (
  patientName: string,
  facilityId: string,
  options = {}
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.searchCustom],
    mutationFn: async () => {
      const response = await apiClient.get({
        url: `${environment.baseUrl}/patient/getpatientbyname`,
        auth: true,
        params: { patientName, facilityId },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.searchCustom] });
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, cb: (res: any) => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          cb?.(res.data);
        },
      });
    },
    data,
    isSuccess,
    isError,
    isLoading: isPending,
  };
};

const useGetPatientById = (patientId: string, options = {}) => {
  //   const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.readOne],
    mutationFn: async () => {
      return apiClient.get({
        url: `${environment.baseUrl}/patient/getpatientbyuniqueid/${patientId}`,
        auth: true,
      });
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: [keys.searchCustom] });
    // },
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
  useSearchPatientByName,
  useGetPatientById,
};

export default queries;
