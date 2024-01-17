import api from '@cloud-equipment/api';
import { environment } from '@cloud-equipment/environments';
import {
  ApiResponse,
  ICreateProcedure,
  IMedservice,
} from '@cloud-equipment/models';

export const _getPrices = async (
  currentPage: number,
  startIndex: number,
  pageSize: number
) => {
  const url = `${environment.baseUrl}/service-manager/medServices/getall`;

  return api.get<ApiResponse<IMedservice[]>>(url, {
    params: { currentPage, startIndex, pageSize },
  });
};

export const _createPrice = async (data: ICreateProcedure) => {
  const url = `${environment.baseUrl}/service-manager/medServices/createservice`;

  return api.post<ApiResponse>(url, data);
};

export const _getMedserviceCategories = async () => {
  return api.get<ApiResponse>(
    `${environment.baseUrl}/service-manager/medServiceCategory/getallcategory`
  );
};

export const _deletePrice = async (id: string) => {
  return api.delete<ApiResponse>(
    `${environment.baseUrl}/service-manager/medServices/delete/${id}`
  );
};

export const _approvePrice = async (id: string) => {
  return api.post<ApiResponse>(
    `${environment.baseUrl}/service-manager/medServices/appprove/${id}`
  );
};
