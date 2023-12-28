import LayoutWithSidebar from "../../components/LayoutWithSidebar";
import Navbar from "../../components/Navbar";
import { MainRouting } from "../../config/routes";

export const Main = () => {
  return (
    <LayoutWithSidebar>
      <div className="Report">
        <Navbar header="Report" />
        <div className="Navmargin"></div>

      </div>
        <MainRouting />
    </LayoutWithSidebar>
  );
};
