import { ManageProceduresChildRoutes } from "./Children/routes";
import SearchIcon from "../../Assets/IconAndLogo/searchInputIcon.png";
import ExportIcon from "../../Assets/IconAndLogo/ExportIcon.png";

export const ManageProceduresList = () => {
  return (
    <section className="ce-padding">
      <div className="tw-flex tw-justify-end">
        <button className="ce-btn">New Procedure</button>
      </div>

      <ManageProceduresChildRoutes />
    </section>
  );
};
