import { Checkbox } from '@mui/material';
import moment from 'moment';
import React from 'react';
import * as Assets from '@cloud-equipment/assets';

const LatestPatientActivities = () => {
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
            {[1, 3, 4]?.map((item, index) => (
              <tr key={index}>
                <td>
                  <Checkbox />
                </td>
                <td>{moment(new Date()).format('DD-MM-YYYY . HH:mm:ss')}</td>
                <td>{'AGP/453'}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <img src={Assets.Images.Temp.DummyUserIcon2} alt="" />
                    <div className="">
                      <p>Jane Doe</p>
                      <p className="font-medium text-sm">
                        adebalanced04@gmail.com
                      </p>
                    </div>
                  </div>
                </td>
                <td>{'Radiography Test'}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="block w-2 h-2 rounded-full bg-greenText"></div>
                    <span className="text-greenText">Confirmed</span>
                  </div>
                </td>
                <td>{'Enabled'}</td>
                <td></td>
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
