import { Checkbox } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import * as Assets from '@cloud-equipment/assets';
import queries from '../../services/queries/appointments';
import { useSelector } from 'react-redux';
import { IAppState } from '../../Store/store';

const LatestPatientActivities = () => {
  const userDetails = useSelector((state: IAppState) => state.auth.user);

  const { isLoading, data } = queries.useGetAppointmentsDaily(
    `/facility-manager/facility/getfacilityappointmentdayily?facilityId=${userDetails?.FACILITY_ID}&startDate=2024-02-01&endDate=2024-05-05&download=false&currentPage=1&startIndex=0&pageSize=10`
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="mt-5 bg-white p-5 rounded-[20px]">
      <h3 className="text-lg font-bold">Latest Patient Activities</h3>

      <div className="mt-4 dashboard-table-holder">
        <table>
          <thead>
            <tr>
              <th className="!text-center">#</th>
              <th>Date</th>
              <th>User ID</th>
              <th className="!pl-8">Name</th>
              <th>Diagnostics</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.resultItem.map((item, index) => (
              <tr key={index}>
                <td>
                  <Checkbox />
                </td>
                <td>
                  {moment(item.appointmentDate).format('DD-MM-YYYY . h:mm: A')}
                </td>
                <td>{item.patient?.patientUniqueID?.substring(0, 5)}..</td>
                <td>
                  <div className="grid grid-cols-[40px,1fr] items-center gap-2">
                    <img src={Assets.Images.Temp.DummyUserIcon2} alt="" />
                    <div className="">
                      <p>{item.patient?.patientName}</p>
                      <p className="font-medium text-sm">
                        {item.patient?.patientEmail}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  {item.tests.map((test, idex) => (
                    <p key={`${index}test`}>{test.medServiceId}</p>
                  ))}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="block w-2 h-2 rounded-full bg-greenText"></div>
                    <span className="text-greenText">Confirmed</span>
                  </div>
                </td>
                <td> </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <TablePagination
              component="div"
              count={total}
              page={currentPage}
              labelRowsPerPage="Items per page"
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPage={pageSize}
            /> */}
      </div>
    </div>
  );
};

export default LatestPatientActivities;
