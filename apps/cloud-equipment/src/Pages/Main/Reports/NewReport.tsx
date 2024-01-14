import { DailyProcedureTracker } from '@cloud-equipment/reports';
import { CreateReportForm } from '@cloud-equipment/reports';

const NewReport = () => {
  return (
    <>
      <DailyProcedureTracker />
      <CreateReportForm />
    </>
  );
};

export default NewReport;
