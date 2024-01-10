import { NavLink } from "react-router-dom";

export const DashboardTabs = ({ itemsList }) => {
  return (
    <div className="overflow-x-auto tw-mt-6">
      <div className="tw-flex tw-gap-3 md:tw-gap-6">
        {itemsList.map((item, index) => (
          <NavLink
            to={item.route}
            key={index}
            end={true}
            className="tw-block tw-w-fit tw-p-4 tw-text-sm tw-font-bold tw-text-[#9799A1] dashboard-tab-link"
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
