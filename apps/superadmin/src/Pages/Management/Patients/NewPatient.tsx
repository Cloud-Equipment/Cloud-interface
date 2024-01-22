import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Modal } from '@mui/material';

import {
  Input,
  TextArea,
  DatePicker,
  FileUpload,
  Select,
} from '../../../components';
import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';
import queries from '../../../services/queries/manageFacility';
import { AddMoreDocumentModal } from '../../../Modals';

interface FormProps {
  patientFacilityCode: string;
  patientName: string;
  patientAge: number;
  patientEmail: string;
  patientPhone: string;
  patientGenderId: number;
  aboutPatient: string;
  maritalStatusId: number;
  address: string;
  isActive: boolean;
  imagePath: string;
}

const NewPatient = () => {
  const { register, handleSubmit, control, getValues, setValue, watch } =
    useForm<FormProps>();

  return (
    <section className="ce-px ce-py">
      <div className="mx-auto xl:w-[90%] 2xl:w-[80%]">
        <div className="flex justify-between items-center">
          <p className="font-medium">Add a Patient Information</p>
          <button>View Patients List</button>
        </div>

        <div className="bg-white mt-4 lg:mt-6 px-4 pb-6 md:px-6 md:pb-8 pt-2 rounded-[20px]">
          <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-3 md:gap-6">
            <Input label="Registration Date" />
            <Input label="Registration Time" />
            <Input label="Patitent ID" />
            <div>
              <FileUpload
                uploadIcon={Assets.Icons.UploadIcon1}
                containerClass="w-6/12"
                uploadLabel="Click to Upload Image"
                // onChange={}
              />
            </div>
            <Input label="Patitent First Name" />
            <Input label="Patitent Last Name" />
            <Input label="Email Address" />
            <Input label="Mobile Number" />
            <Controller
              name="patientGenderId"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Select
                  options={[
                    {
                      value: 'hey',
                      label: 'hey',
                      categoryName: 'categoryName',
                      categoryId: 'categoryId',
                    },
                  ]}
                  label="Gender"
                  placeholder="Select Gender"
                  containerClass="flex-1"
                  {...{ field }}
                />
              )}
            />
            <Input label="Date of Birth" />
            <Input label="Age" />

            <Controller
              name="maritalStatusId"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Select
                  options={[
                    {
                      value: 'hey',
                      label: 'hey',
                      categoryName: 'categoryName',
                      categoryId: 'categoryId',
                    },
                  ]}
                  label="Marital Status"
                  placeholder="Select Marital Status"
                  {...{ field }}
                />
              )}
            />

            <Input label="Address" containerClass="md:col-span-2" />

            <div className="md:col-span-2 border-b-[2px] pb-1 mt-4 border-b-solid border-borderLine">
              <h4 className="font-bold text-xl">Emergency Contact</h4>
              <p className="text-sm text-greyText2 mt-1">
                You are to populate the Rebate Amount to efficiency calculate a
                deduction
              </p>
            </div>

            <Input label="First Name" />
            <Input label="Last Name" />
            <Input label="Contact Number" />
            <Input label="Relationship" />
            <Input label="Payment Type" />

            <div className="md:col-span-2 border-b-[2px] pb-1 mt-4 border-b-solid border-borderLine">
              <h4 className="font-bold text-xl">Emergency Contact</h4>
              <p className="text-sm text-greyText2 mt-1">
                You are to populate the Rebate Amount to efficiency calculate a
                deduction
              </p>
            </div>

            <TextArea
              rows={5}
              label="Additional Notes"
              placeholder="Leave a Note"
              containerClass="md:col-span-2"
            />

            <Input
              label="Reason for Registration"
              containerClass="md:col-span-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewPatient;
