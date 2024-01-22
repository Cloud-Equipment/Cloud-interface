import React, { useState } from 'react';
import * as Assets from '@cloud-equipment/assets';
import {
  Input,
  TextArea,
  DatePicker,
  FileUpload,
  Select,
} from '../../../components';
import { useNavigate } from 'react-router-dom';

const ViewPatient = () => {
  const [patientDetails, setPatientDetails] = useState<any>({});
  const navigate = useNavigate();

  return (
    <section className="ce-px ce-py">
      <div className="bg-white rounded-[20px] px-4 py-8">
        <div className="flex justify-between">
          <h3 className="text-2xl">Profile</h3>

          <button onClick={() => navigate(-1)}>
            <img src={Assets.Icons.BoxCloseIcon} alt="" />
          </button>
        </div>

        <div className="mt-10">
          <FileUpload
            uploadIcon={Assets.Icons.UploadIcon1}
            containerClass="w-[150px]"
            uploadLabel="Click to Upload Image"
            // onChange={}
          />

          <p className="text-greyText2 mt-3">User ID: AGP/453</p>
          <p className="font-semibold text-lg">Emma Ummuna</p>

          <div className="mt-10 flex items-center gap-3 flex-wrap">
            <button className="ce-btn bg-greenText">New Appointment</button>
            <button className="ce-btn-text">Refer Patient</button>
            <button className="ce-btn-outline">Edit Profile</button>
          </div>
        </div>

        <h5 className="text-lg font-medium mt-10">Patient Information</h5>

        <div className="mt-10 [box-shadow:0px_4px_12px_0px_#0D5F5026] rounded-lg p-4 md:px-10 grid md:grid-cols-3 2xl:grid-cols-5 gap-4 2xl:gap-10">
          <div>
            <p className="text-base font-medium">Phone Number</p>
            <p className="text-greyText2">{patientDetails?.phoneNo}</p>
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
            <p className="text-greyText2">{patientDetails?.patientAge}</p>
          </div>
          <div>
            <p className="text-base font-medium">Address</p>
            <p className="text-greyText2">{'-'}</p>
          </div>
          <div>
            <p className="text-base font-medium">Procedure Category</p>
            <p className="text-greyText2">{patientDetails?.medServiceName}</p>
          </div>
          <div>
            <p className="text-base font-medium">Procedure</p>
            <p className="text-greyText2">{patientDetails?.medServiceName}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewPatient;
