import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { apiClient } from '@cloud-equipment/api';
import { toast } from 'react-toastify';
import { environment } from '@cloud-equipment/environments';
import { ApiResponse } from 'Models/api.models';

const useLogin = (options = {}, accountType: 0 | 1) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: ['Login'],
    mutationFn: async (data: any) => {
      return apiClient.post({
        url:
          accountType === 0
            ? '/user-manager/account/user/login'
            : '/user-manager/account/ceuser/salogin',
        body: data,
        auth: true,
      });
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, cb: () => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          console.log({ res });
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

const useForgotPassword = (accountType: 0 | 1, options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: ['Forgot-Password'],
    mutationFn: async (data: { email?: string; phone?: string }) => {
      let url = '';

      if (accountType === 0) {
        if (data.email) {
          url = `/user-manager/account/ceuser/forgot-password?email=${data.email}`;
        }
        if (data.phone) {
          url = `/user-manager/account/ceuser/forgot-password?phone=${data.phone}`;
        }
      } else {
        if (data.email) {
          url = `/user-manager/account/user/forgot-password?email=${data.email}`;
        }
        if (data.phone) {
          url = `/user-manager/account/user/forgot-password?phone=${data.phone}`;
        }
      }

      return apiClient.post({
        url,
        body: data,
        auth: true,
      });
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (bodyArg: any, cb: () => void) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          toast.success(res.message);
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

const useChangePassword = (accountType: 0 | 1, options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationKey: ['Change-Password'],
    mutationFn: async (payload: {
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      let url = '';

      if (accountType === 0) {
        url = `${environment.baseUrl}/user-manager/account/ceuser/change-password`;
      } else {
        url = `${environment.baseUrl}/user-manager/account/user/change-password`;
      }

      return apiClient.post({
        url,
        body: payload,
        auth: true,
      });
    },
  });
  const { mutate, isSuccess, isError, data, isPending } = mutation;

  return {
    mutateFn: (
      bodyArg: {
        email: string;
        password: string;
        confirmPassword: string;
      },
      cb: () => void
    ) => {
      return mutate(bodyArg, {
        onSuccess: (res) => {
          toast.success(res.message);
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

const useValidateToken = (
  accountType: 0 | 1,
  email: string,
  token: string,
  options = {}
) => {
  const hash = ['validate-token', email];
  let url = ``;

  if (accountType === 1) {
    url = `${environment.baseUrl}/user-manager/account/user/validate-token`;
  } else {
    //
  }

  const { isLoading, data, isSuccess, error }: UseQueryResult<any> = useQuery({
    queryKey: hash,
    retry: false,
    queryFn: () =>
      apiClient
        .post({
          url,
          params: { token, email },
          auth: true,
          body: { email, token },
        })
        .then((res: ApiResponse) => {
          window.location.replace(`/auth/change-password?email=${email}`);
          return res.data.resultItem;
        })
        .catch((err) => window.location.replace('/auth')),
  });

  return { isLoading, data, isSuccess, error };
};

const queries = {
  useLogin,
  useForgotPassword,
  useValidateToken,
  useChangePassword,
};

export default queries;
