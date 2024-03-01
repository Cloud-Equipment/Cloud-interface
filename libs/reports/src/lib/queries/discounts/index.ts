import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@cloud-equipment/api';
import keys from './keys';

const useGetAllDiscountsForFacility = (facilityId: string, options = {}) => {
  const mutation = useMutation({
    ...options,
    mutationKey: [keys.getAll],
    mutationFn: async () => {
      const response = await apiClient.get({
        url: `/payment/discounts/getactivediscount/facilityId`,
        auth: true,
        params: { facilityId },
      });

      return response.data;
    },
    onSuccess: () => {},
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
  useGetAllDiscountsForFacility,
};

export default queries;
