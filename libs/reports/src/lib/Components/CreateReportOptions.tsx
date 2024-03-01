import { IUser } from '@cloud-equipment/models';
import React from 'react';
import { useSelector } from 'react-redux';
import * as Assets from '@cloud-equipment/assets';

const CreateReportOptions = ({
  onViewFormClick,
}: {
  onViewFormClick: () => void;
}) => {
  const userDetails = useSelector(
    (state: { auth: { user: IUser } }) => state.auth.user
  );

  return (
    <div className="ce-px ce-py">
      <div className="rounded-[20px] border-[#E5E5E5] border border-solid p-4 md:p-8 mx-auto max-w-[900px]">
        <div className=" grid gap-4 md:grid-cols-2 md:gap-5 xl:gap-8">
          <div className="bg-white grid gap-3 rounded-[20px] px-5 py-6 md:px-6 md:py-10">
            <img
              className="block mx-auto w-[70px]"
              src={Assets.Icons.FileUpload}
              alt=""
            />

            <p className="font-medium">Import file from Computer</p>

            <p className="text-sm text-greyText">
              Upload any CSV, XLS, or XLSX files with contact, and Riders
              information
            </p>
          </div>

          <div
            onClick={onViewFormClick}
            className="bg-white cursor-pointer grid gap-3 rounded-[20px] px-5 py-6 md:px-6 md:py-10 "
          >
            <img
              className="block mx-auto w-[70px]"
              src={Assets.Icons.FileUpload}
              alt=""
            />

            <p className="font-medium">Fill the Online Form</p>

            <p className="text-sm text-greyText">
              You can type in the necessary information as requested from CE
            </p>
          </div>
        </div>

        <p className="text-sm mt-10 md:mt-14 text-center">
          Need help getting started?
        </p>

        <p className="text-greenText mt-3 text-sm font-medium text-center">
          Download sample spreadsheet template
        </p>
      </div>
    </div>
  );
};

export default CreateReportOptions;
