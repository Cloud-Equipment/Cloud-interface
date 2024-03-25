import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import queries from '../../services/queries/dashboard';
import { useSelector } from 'react-redux';
import { IAppState } from '../../Store/store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: false,
      text: 'Patient Activity',
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Hide vertical grid lines
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

const PatientActivityChart = () => {
  const userDetails = useSelector((state: IAppState) => state.auth.user);

  const { useGetDashboardCharts_FacilityAdmin } = queries;
  const { isLoading, data: chartData } = useGetDashboardCharts_FacilityAdmin(
    `/dashboard-manager/facilityadmin-analytics?facilityId=${userDetails?.FACILITY_ID}`
  );

  return (
    <div className="bg-white rounded-[20px] p-4">
      <h3 className="text-blackText font-semibold mb-5">Patient Activity</h3>

      <Bar
        options={options}
        data={{
          labels: chartData?.patientActivity?.labels ?? [],
          datasets: [
            {
              label: 'Patient Activity',
              data: chartData?.patientActivity?.data ?? [],
              backgroundColor: '#D8EEEA',
              barThickness: 20,
              borderRadius: {
                topLeft: 4,
                topRight: 4,
              },
            },
          ],
        }}
      />
    </div>
  );
};

export default PatientActivityChart;
