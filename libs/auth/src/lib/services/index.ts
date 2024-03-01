import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@cloud-equipment/api';
import { toast } from 'react-toastify';

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

const queries = {
  useLogin,
  useForgotPassword,
};

export default queries;
