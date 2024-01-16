import { environment } from '@cloud-equipment/environments';
import axios from 'axios';
import { ApiResponse, PaginationData } from 'Models/api.models';
import { IMedservice } from 'Models/procedures.models';

export const _getPrices = async (
  currentPage: number,
  startIndex: number,
  pageSize: number
) => {
  const url = `${environment.baseUrl}/service-manager/medServices/getall`;

  return axios.get<ApiResponse<IMedservice[]>>(url, {
    params: { currentPage, startIndex, pageSize },
  });
};
