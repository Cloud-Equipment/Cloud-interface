import axios, { AxiosRequestConfig } from 'axios';

import { environment } from '@cloud-equipment/environments';
import { axiosInstance } from '@cloud-equipment/api';

type Request = {
  url: string;
  body: any;
  auth: boolean;
  config?: AxiosRequestConfig<any>;
};
type PATCH_REQ = Omit<Request, 'auth'>;
type GET_REQ = Partial<Omit<Request, 'body'>>;
const { baseUrl } = environment;
const del = async ({ url }: Request) => (await axiosInstance.delete(url)).data;

const get = async ({ url = '', auth = true }: GET_REQ) => {
  return (await (auth ? axiosInstance.get(url) : axios.get(baseUrl + url)))
    .data;
};

const post = async ({ url, body, auth = true, config = {} }: Request) => {
  return (
    await (auth
      ? axiosInstance.post(url, body, { ...config })
      : axios.post(baseUrl + url, body))
  ).data;
};

const patch = async ({ url, body }: PATCH_REQ) =>
  (await axiosInstance.patch(url, body)).data;

const put = async ({ url, body }: PATCH_REQ) =>
  (await axiosInstance.put(url, body)).data;

const apiClient = {
  delete: del,
  get,
  patch,
  post,
  put,
};

export default apiClient;
