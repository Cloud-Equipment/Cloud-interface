import React from 'react';
import * as Assets from '@cloud-equipment/assets';
import LatestPatientActivities from './LatestPatientActivities';
import queries from '../../services/queries/dashboard';
import { useSelector } from 'react-redux';
import { IAppState } from '../../Store/store';

const ReceptionistDashboardSub = () => {
  const userDetails = useSelector((state: IAppState) => state.auth.user);

  const { useGetDashboardSummary_Receptionist } = queries;
  const { isLoading, data } = useGetDashboardSummary_Receptionist(
    `/dashboard-manager/receptionist/cards?facilityId=${userDetails?.FACILITY_ID}`
  );

  return (
    <>
      <div className="relative mt-20 p-4 rounded-2xl [background:linear-gradient(66.15deg,_#F6FEFC_-5.25%,_#9BD8F1_35.43%,_#0D5F50_98.77%)]">
        <h3 className="font-medium">Visits for Today</h3>
        <h2 className="font-bold text-4xl">{data?.visitsToday}</h2>
        <div className="grid gap-4 mt-10 sm:flex">
          <div className="bg-[#FFFFFF8C] rounded-[18px] p-3 sm:min-w-[200px]">
            <p>New Patients Today</p>
            <h3 className="font-medium mt-2 text-3xl">
              {Number(data?.newPatientToday) || 0}
            </h3>
          </div>
          <div className="bg-[#FFFFFF8C] rounded-[18px] p-3 sm:min-w-[200px]">
            <p>Visits Today</p>
            <h3 className="font-medium mt-2 text-3xl">
              {Number(data?.visitsToday) || 0}
            </h3>
          </div>
        </div>

        <img
          className="hidden md:block absolute bottom-0 right-4 w-[45%]"
          src={Assets.Images.Dashboard.ReceptionistDashboardMan}
          alt=""
        />
      </div>

      <LatestPatientActivities />
    </>
  );
};

export default ReceptionistDashboardSub;
