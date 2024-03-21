import React from 'react';
import * as Assets from '@cloud-equipment/assets';
import { Button, DashboardCard } from '@cloud-equipment/ui-components';
import PatientActivityChart from './PatientActivityChart';
import MonthlyRevenueChart from './MonthlyRevenueChart';
import LatestPatientActivities from './LatestPatientActivities';
import queries from '../../services/queries/dashboard';
import { useSelector } from 'react-redux';
import { IAppState } from '../../Store/store';

const FacilityAdminDashboardSub = () => {
  const userDetails = useSelector((state: IAppState) => state.auth.user);

  const { useGetDashboardSummary_FacilityAdmin } = queries;
  const { isLoading, data } = useGetDashboardSummary_FacilityAdmin(
    `/dashboard-manager/facilityAdmin/cards?facilityId=${userDetails?.FACILITY_ID}`
  );

  return (
    <>
      <div className="grid mt-5 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <DashboardCard
          icon={Assets.Icons.Dashboard.Calendar}
          text="Appointments"
          figure={data?.appointments ?? 0}
          metric={Number(data?.appointmentsMetric) || 0}
        />
        <DashboardCard
          icon={Assets.Icons.Dashboard.Equipment}
          text="Referred Patient"
          figure={data?.referredPatient ?? 0}
          metric={Number(data?.referredPatientMetric) || 0}
        />
        <DashboardCard
          icon={Assets.Icons.Dashboard.RedCalendar}
          text="In-Patient Today"
          figure={data?.inpatient ?? 0}
          metric={Number(data?.inpatientMetric) || 0}
        />
        <DashboardCard
          icon={Assets.Icons.Dashboard.Procedure}
          text="Earnings Today"
          figure={data?.earningToday ?? 0}
          metric={Number(data?.totalEarningMetric) || 0}
        />
      </div>

      <div className="grid 2xl:grid-cols-2 mt-5 gap-5">
        <PatientActivityChart />
        <MonthlyRevenueChart />
      </div>

      <LatestPatientActivities />
    </>
  );
};

export default FacilityAdminDashboardSub;
