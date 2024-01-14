import axios, { AxiosResponse } from 'axios';
import { environment } from '../../environments/environments';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiResponse } from '../../Models/api.models';

const api = axios.create({
  baseURL: environment.baseUrl,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth headers to the request config
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Modify response data here
    if (response.data.success) {
    } else {
      toast.error(response.data.msg);
    }
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

export default api;
