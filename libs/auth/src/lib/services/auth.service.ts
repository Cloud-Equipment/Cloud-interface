import { axiosInstance } from '@cloud-equipment/api';
import { environment } from '@cloud-equipment/environments';

export const _login = (payload: any) => {
  return axiosInstance.post(
    `${environment.baseUrl}/user-manager/account/user/auth/login`,
    payload
  );
};

export const _superadminLogin = (payload: any) => {
  return axiosInstance.post(
    `${environment.baseUrl}/user-manager/account/ceuser/auth/salogin`,
    payload
  );
};
