import React from 'react';

import { Input, TextArea, DatePicker, FileUpload } from '../../../components';
import * as Assets from '@cloud-equipment/assets';

const AddNewFacility = () => {
  return (
    <section className="ce-px ce-py">
      <div className="p-[16px] mt-[20px] rounded-[20px]">
        <h4 className="ce-heading-2">Management &gt; Facilities </h4>
        <div className="min-h-screen px-8 py-3 rounded-[20px] mt-10  bg-white border shadow-pageFormShadow">
          <h4 className="">Create New Facility</h4>
          <section className="">
            <div className="">
              <h5 className="">Facility Information</h5>
              <p className="mb-5">
                You are to populate the Rebate Amount to efficiency calculate a
                deduction
              </p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <FileUpload
                    uploadIcon={Assets.Icons.UploadIcon1}
                    containerClass="w-4/12"
                    uploadLabel="Click to Upload facility Logo"
                  />
                </div>
                <Input label="Facility ID" containerClass="flex-1" />
              </div>
              <Input label="Name of Facility" containerClass="flex-1" />
              <TextArea
                rows={5}
                label="Address of Facility"
                placeholder="Address of Facility"
                containerClass="mt-1"
              />
              <div className="flex gap-4 my-4">
                <DatePicker
                  label="Registration Date "
                  containerClass="flex-1"
                />
                <Input label="Country " containerClass="flex-1" />
              </div>
              <div className="flex gap-4 my-4">
                <Input label="State " containerClass="flex-1" />
                <Input
                  label="City"
                  containerClass="flex-1"
                  placeholder="Enter City"
                />
              </div>
              <div className="flex gap-4 my-4">
                <DatePicker label="Email of Facility" containerClass="flex-1" />
                <Input
                  label="Phone Number of facility"
                  containerClass="flex-1"
                />
              </div>
              <div className="flex gap-4 my-4">
                <Input label="Facility Type" containerClass="flex-1" />
                <Input label="Rebate Percentage" containerClass="flex-1" />
              </div>
              <div className="flex gap-4 my-4">
                <Input
                  label="Number of User "
                  placeholder="Input Number of User"
                  containerClass="flex-1"
                />
                <Input
                  label="Phone Number of Admin "
                  placeholder="+234 08143626356"
                  containerClass="flex-1"
                />
              </div>
            </div>
            <div className="">
              <h5 className="">Admin Information</h5>
              <p className="">
                You are to populate the Admin Information Aspect
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default AddNewFacility;
