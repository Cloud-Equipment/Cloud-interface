import axios from 'axios';

import { environment } from '@cloud-equipment/environments';
import { axiosInstance } from '@cloud-equipment/api';

type Request = {
  url: string;
  body: any;
  auth: boolean;
  params?: any;
};
type PATCH_REQ = Omit<Request, 'auth'>;
type GET_REQ = Partial<Omit<Request, 'body'>>;
const { baseUrl } = environment;
const del = async ({ url, body: data }: Request) =>
  (
    await axiosInstance.delete(url, {
      data,
    })
  ).data;

const get = async ({ url = '', auth = true, params }: GET_REQ) => {
  return (
    await (auth
      ? axiosInstance.get(url, { params })
      : axios.get(baseUrl + url, { params }))
  ).data;
};

const post = async ({ url, body, auth = true }: Request) => {
  return (
    await (auth
      ? axiosInstance.post(url, body)
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
