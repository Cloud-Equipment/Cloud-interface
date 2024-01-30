import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { environment } from '../../environments/environments';
import { ApiResponse } from '../../Models/api.models';
import { showToast } from '../../apps/superadmin/src/utils/toast';

const axiosInstance = axios.create({
  baseURL: environment.baseUrl,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add auth headers to the request config
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Modify response data here
    if (response.data.success) {
    } else {
      // toast.error(response.data.msg);
      showToast(response?.data?.msg || 'An error occured', 'error');
    }
    return response;
  },
  (error) => {
    // TODO: Logout for a 401 unauthorized status code
    const errorMessage = error.response?.data?.message || 'An error occurred';
    showToast(errorMessage || 'An error occured', 'error');
    return Promise.reject(error);
  }
);

export default axiosInstance;
