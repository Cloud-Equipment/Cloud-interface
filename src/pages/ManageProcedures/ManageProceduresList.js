import { ManageProceduresChildRoutes } from "./Children/routes";
import SearchIcon from "../../Assets/IconAndLogo/searchInputIcon.png";
import ExportIcon from "../../Assets/IconAndLogo/ExportIcon.png";

export const ManageProceduresList = () => {
  return (
    <section className="ce-padding">
      <div className="tw-flex tw-justify-end">
        <button className="ce-btn">New Procedure</button>
      </div>

      <div className="tw-p-[16px] tw-bg-[white] tw-mt-[20px] tw-rounded-[20px]">
        <h4 className="ce-heading-2">Available Procedure</h4>

        <div className="tw-grid tw-mt-[28px] tw-gap-[20px] tw-grid-cols-[1fr_1fr] lg:tw-flex tw-items-center lg:tw-justify-between">
          <div className="tw-col-span-2 lg:tw-col-span-[unset] lg:tw-w-[50%] search-input-container">
            <input placeholder="Search for Services" />
            <img src={SearchIcon} />
          </div>

          <div>All Category</div>

          <button className="export-btn">
            <img src={ExportIcon} alt="" />
            <span>Export</span>
          </button>
        </div>

        <ManageProceduresChildRoutes />
      </div>
    </section>
  );
};
