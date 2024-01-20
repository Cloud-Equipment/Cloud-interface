import React from 'react';
import * as Assets from '@cloud-equipment/assets';

interface DashboardCardProps {
  text: string;
  figure: number;
  icon: string;
}

const DashboardCard = ({ text, figure, icon }: DashboardCardProps) => {
  return (
    <div className="rounded-[20px] p-3 bg-white">
      <div className="flex gap-4 items-center">
        <img className="w-10" src={icon} alt="" />
        <p>{text}</p>
      </div>

      <div className="flex gap-4 items-center mt-4">
        <p className="font-medium text-3xl">{figure}</p>
        <div className="flex items-center gap-1">
          <img src={Assets.Icons.Dashboard.TrendUp} alt="" />
          <span className="text-greenText text-sm">40%</span>
          <span className="text-greyText text-xs">from last week</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
