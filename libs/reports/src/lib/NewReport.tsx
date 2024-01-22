import DailyProcedureTracker from './Components/DailyProcedureTracker';
import CreateReportForm from './Components/CreateReportForm';
import { useSelector } from 'react-redux';
import { IUser, UserTypeEnum } from '@cloud-equipment/models';
import { useEffect, useState } from 'react';
import CreateReportOptions from './Components/CreateReportOptions';

const NewReport = () => {
  const accountType = useSelector(
    (state: { account: { accountType: 0 | 1 } }) => state.account.accountType
  );

  const userDetails = useSelector(
    (state: { auth: { user: IUser } }) => state.auth.user
  );

  const [view, setView] = useState<0 | 1>(1);

  useEffect(() => {
    if (
      accountType === 0 ||
      userDetails.userType === UserTypeEnum.FACILITY_ADMIN
    ) {
      setView(0);
    }
  }, []);

  return (
    <>
      <DailyProcedureTracker />

      {view === 0 ? (
        <CreateReportOptions
          onViewFormClick={() => {
            setView(1);
          }}
        />
      ) : (
        <CreateReportForm />
      )}
    </>
  );
};

export default NewReport;
