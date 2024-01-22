import { axiosInstance } from '@cloud-equipment/api';
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

  return axiosInstance.get<ApiResponse<IMedservice[]>>(url, {
    params: { currentPage, startIndex, pageSize },
  });
};

export const _createPrice = async (data: ICreateProcedure) => {
  const url = `${environment.baseUrl}/service-manager/medServices/createservice`;

  return axiosInstance.post<ApiResponse>(url, data);
};

export const _getMedserviceCategories = async () => {
  return axiosInstance.get<ApiResponse>(
    `${environment.baseUrl}/service-manager/medServiceCategory/getallcategory`
  );
};

export const _deletePrice = async (id: string) => {
  return axiosInstance.delete<ApiResponse>(
    `${environment.baseUrl}/service-manager/medServices/delete/${id}`
  );
};

export const _approvePrice = async (id: string) => {
  return axiosInstance.post<ApiResponse>(
    `${environment.baseUrl}/service-manager/medServices/appprove/${id}`
  );
};

export const _getAllFacilities = async () => {
  return axiosInstance.get<ApiResponse>(
    `${environment.baseUrl}/api/facility-manager/getallfacilities`
  );
};
