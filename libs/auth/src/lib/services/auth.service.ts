import api from '@cloud-equipment/api';
import { environment } from '@cloud-equipment/environments';

export const _login = (payload: any) => {
  return api.post(`${environment.baseUrl}/user-manager/account/user/login`, payload);
};

export const _superadminLogin = (payload: any) => {
  return api.post(`${environment.baseUrl}/user-manager/account/ceuser/salogin`, payload);
};
