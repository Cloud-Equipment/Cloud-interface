import React from "react";
import DailyProcedureTracker from "../../../components/Reports/DailyProcedureTracker";
import CreateReportForm from "../../../components/Reports/CreateReportForm";

const NewReport = () => {
  return (
    <>
      <DailyProcedureTracker />
      <CreateReportForm />
    </>
  );
};

export default NewReport;
