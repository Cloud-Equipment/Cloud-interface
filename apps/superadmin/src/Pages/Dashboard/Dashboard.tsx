import React from 'react';
import * as Assets from '@cloud-equipment/assets';
import { DashboardCard } from '@cloud-equipment/ui-components';
import { DashboardCalendar } from '@cloud-equipment/ui-components';

const Dashboard = () => {
  return (
    <section className="ce-px ce-py grid xl:grid-cols-[1fr_400px] gap-5">
      <div>
        <div className="md:flex justify-between md:items-center gap-4">
          <div className="flex gap-2 items-center">
            <img
              src={Assets.Images.Temp.DummyUserIcon3}
              alt="User Profile Pic"
            />
            <div>
              <h3 className="text-ce-green text-2xl">
                <span className="font-normal">Hello,</span> Emma Taylor
              </h3>
              <p className="text-greyText2">
                Check your activities in this dashboard.
              </p>
            </div>
          </div>
        </div>
        <div className="grid mt-5 gap-4 md:grid-cols-2 2xl:grid-cols-4">
          <DashboardCard
            icon={Assets.Icons.Dashboard.Calendar}
            text="Referred Patient"
            figure={20}
          />
          <DashboardCard
            icon={Assets.Icons.Dashboard.RedCalendar}
            text="In-Patient Today"
            figure={20}
          />
          <DashboardCard
            icon={Assets.Icons.Dashboard.RedTelephone}
            text="Manage Facilities"
            figure={20}
          />
          <DashboardCard
            icon={Assets.Icons.Dashboard.Equipment}
            text="Equipment Management"
            figure={20}
          />
          <DashboardCard
            icon={Assets.Icons.Dashboard.Procedure}
            text="Procedure Management"
            figure={20}
          />
          <DashboardCard
            icon={Assets.Icons.Dashboard.Price}
            text="Price Management"
            figure={20}
          />
          <DashboardCard
            icon={Assets.Icons.Dashboard.Calendar}
            text="Discounts Management"
            figure={20}
          />
          <DashboardCard
            icon={Assets.Icons.Dashboard.Facilities}
            text="Facilities Report"
            figure={20}
          />
        </div>
      </div>

      <div className="bg-white rounded-[20px]">
        <DashboardCalendar />
      </div>
    </section>
  );
};

export default Dashboard;
