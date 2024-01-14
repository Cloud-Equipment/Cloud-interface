import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IProcedure } from '@cloud-equipment/models';
import { environment } from '@cloud-equipment/environments';
import axios from 'axios';
import * as Assets from '@cloud-equipment/assets';

export const ViewReport = () => {
  const { id } = useParams();
  const [reportDetails, setReportDetails] = useState<IProcedure | null>(null);

  useEffect(() => {
    const url = `${environment.baseUrl}/service-manager/procedures/get/${id}`;
    axios
      .get(url)
      .then((res) => {
        // alert(res.data.data);
        setReportDetails(res.data?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="p-5 md:p-10">
      <section className="rounded-xl bg-white p-5">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl">Procedure Details</h4>

          <Link to="/reports">
            <button className="btn-icon">
              <img src={Assets.Icons.BoxCloseIcon} className="w-5" alt="-" />
            </button>
          </Link>
        </div>

        <p className="text-lg font-medium mt-4">
          <span className="text-base font-normal"> Patient Name:</span>{' '}
          {reportDetails?.patientName}
        </p>

        <p className="mt-5">User ID: {reportDetails?.patientId}</p>

        <p className="mt-2 font-medium text-lg">{reportDetails?.patientName}</p>

        <div className="flex items-center gap-3 flex-wrap">
          <button className="ce-btn">New Appointment</button>
          <button className="ce-btn-text">Refer Patient</button>
          <button className="ce-btn-outline">Upload Result</button>
        </div>

        <div className="mt-10 [box-shadow:0px_4px_12px_0px_#0D5F5026] rounded-lg p-4 md:px-10 grid md:grid-cols-3 2xl:grid-cols-5 gap-4 2xl:gap-10">
          <div>
            <p className="text-base font-medium">Phone Number</p>
            <p className="text-greyText2">{reportDetails?.phoneNo}</p>
          </div>
          <div>
            <p className="text-base font-medium">Email</p>
            <p className="text-greyText2">{'-'}</p>
          </div>
          <div>
            <p className="text-base font-medium">Gender</p>
            <p className="text-greyText2">{'-'}</p>
          </div>
          <div>
            <p className="text-base font-medium">Age of Patient</p>
            <p className="text-greyText2">{reportDetails?.patientAge}</p>
          </div>
          <div>
            <p className="text-base font-medium">Address</p>
            <p className="text-greyText2">{'-'}</p>
          </div>
          <div>
            <p className="text-base font-medium">Procedure Category</p>
            <p className="text-greyText2">{reportDetails?.medServiceName}</p>
          </div>
          <div>
            <p className="text-base font-medium">Procedure</p>
            <p className="text-greyText2">{reportDetails?.medServiceName}</p>
          </div>
        </div>

        <div className="mt-10 [box-shadow:0px_4px_12px_0px_#0D5F5026] rounded-lg p-4 md:px-10 ">
          <div className="border-b-[2px] pb-1 border-b-solid border-borderLine">
            <h4 className="font-bold text-xl">Decuction</h4>
            <p className="text-sm text-greyText2 mt-1">
              You are to populate the Rebate Amount to efficiency calculate a
              deduction
            </p>
          </div>

          <div className="grid md:grid-cols-3 mt-6 2xl:grid-cols-5 gap-4 2xl:gap-10">
            <div>
              <p className="text-base font-medium">Discount Code</p>
              <p className="text-greyText2">{reportDetails?.phoneNo}</p>
            </div>
            <div>
              <p className="text-base font-medium">Rebate Id</p>
              <p className="text-greyText2">{reportDetails?.rebateId}</p>
            </div>
            <div>
              <p className="text-base font-medium">Referrer's Name</p>
              <p className="text-greyText2">{reportDetails?.referrersName}</p>
            </div>
            <div>
              <p className="text-base font-medium">Referrer's Email</p>
              <p className="text-greyText2">{reportDetails?.refererEmail}</p>
            </div>
            <div>
              <p className="text-base font-medium">Referrer's Hospital</p>
              <p className="text-greyText2">{reportDetails?.refererHospital}</p>
            </div>
            <div>
              <p className="text-base font-medium">Referrer's Number</p>
              <p className="text-greyText2">{reportDetails?.phoneNumber}</p>
            </div>
            <div>
              <p className="text-base font-medium md:col-span-2">Remarks</p>
              <p className="text-greyText2">{reportDetails?.remarks}</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
