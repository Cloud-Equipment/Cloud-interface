import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import apiMethods from '../../api';
import { IUser } from './types';
import { ApiResponse, PaginationData } from 'Models/api.models';
import keys from './keys';
import { showToast } from '@cloud-equipment/utils';

const useGetUsers = (
  url: string,
  body: any,
  options: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'initialData' | 'queryFn' | 'queryKey'
  > = {},
  pageNumber = { currentPage: 1, pageSize: 10 }
) => {
  const hash = [
    keys.read,
    'users',
    `${pageNumber.currentPage}`,
    `${pageNumber.pageSize}`,
  ];
  const {
    isLoading,
    data,
    isSuccess,
    error,
  }: UseQueryResult<PaginationData<IUser>, unknown> = useQuery({
    queryKey: hash,
    queryFn: () =>
      apiMethods
        .post({ url, body, auth: true })
        .then((res: ApiResponse<PaginationData<IUser>>) => res.data),
    ...options,
  });
  return { isLoading, data, isSuccess, error };
};

const useInviteUser = (options = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      const { email } = data;
      return apiMethods.post({
        url: `/user-manager/account/user/invite?email=${email}`,
        body: data,
        auth: false,
      });
    },
    onSuccess: () => {},
    onError: (res) => {
      showToast(res.message, 'error');
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, successCb?: () => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: [keys.read] });
          showToast(res.msg || 'User Invited Successfully', 'success');
          setTimeout(() => {
            successCb?.();
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

const useCreateUser = (options = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      return apiMethods.post({
        url: `/user-manager/account/user/auth/register`,
        body: data,
        auth: false,
      });
    },
    onSuccess: () => {},
    onError: (res) => {
      showToast(res.message, 'error');
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, successCb?: () => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: [keys.read] });
          showToast(res.msg || 'User Created Successfully', 'success');
          setTimeout(() => {
            successCb?.();
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

const useDisableUser = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      return apiMethods.post({
        url: `/user-manager/account/user/disableuser?userId=${data?.id}`,
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
    mutateFn: (bodyArg: any, successCb?: () => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          showToast(res.message || 'User Disabled Successfully', 'success');
          setTimeout(() => {
            successCb?.();
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

const useEnableUser = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      return apiMethods.post({
        url: `/user-manager/account/user/enableuser?userId=${data?.id}`,
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
    mutateFn: (bodyArg: any, successCb?: () => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          showToast(res.message || 'User Enabled Successfully', 'success');
          setTimeout(() => {
            successCb?.();
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

const useUpdateUser = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: [keys.create],
    mutationFn: async (data: any) => {
      const { id } = data;
      return apiMethods.patch({
        url: `/user-manager/account/user/update?userId=${id}`,
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.read] });
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, successCb: () => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          showToast(
            res.message || 'User details updated Successfully',
            'success'
          );
          setTimeout(() => {
            successCb?.();
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
  useGetUsers,
  useUpdateUser,
  useDisableUser,
  useEnableUser,
  useInviteUser,
  useCreateUser,
};

export default queries;
