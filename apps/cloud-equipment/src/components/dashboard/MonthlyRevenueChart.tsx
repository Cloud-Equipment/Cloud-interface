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
// import faker from 'faker';

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Patient Activity',
      data: [5, 6, 7],
      backgroundColor: '#D8EEEA',
      barThickness: 20,
      borderRadius: {
        topLeft: 4,
        topRight: 4,
      },
    },
  ],
};

const MonthlyRevenueChart = () => {
  return (
    <div className="bg-white rounded-[20px] p-4">
      <h3 className="text-blackText font-semibold mb-5">
        Monthly Revenue for Procedures
      </h3>

      <Bar options={options} data={data} />
    </div>
  );
};

export default MonthlyRevenueChart;
