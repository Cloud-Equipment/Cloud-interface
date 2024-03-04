import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Modal } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Input,
  TextArea,
  DatePicker,
  FileUpload,
  Select,
  TimePicker,
} from '../../../components';
import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';
import queries from '../../../services/queries/managePatients';
import { AddNewPatientModal } from '../../../Modals';

interface FormProps {
  patientFacilityCode: string;
  patientName: string;
  firstName: string;
  lastName: string;
  patientAge: number;
  patientEmail: string;
  patientPhone: string;
  patientGenderId: number;
  aboutPatient: string;
  maritalStatusId: number;
  bloodGroupId: number;
  dateOfBirth: string;
  dateOfDeath: string;
  address: string;
  isActive: boolean;
  imagePath: string;
  patientUniqueID: string;
  //
  // registrationTime: any;
  // registrationDate: any;
  [key: string]: any;
}

const NewPatient = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { useCreatePatient } = queries;
  const { mutateFn, isLoading } = useCreatePatient();
  const { register, handleSubmit, control, getValues, setValue } =
    useForm<FormProps>();
  const [createPatientModalPromptIsOpen, setCreatePatientModalPromptIsOpen] =
    useState(false);

  const onClose = () => {
    setCreatePatientModalPromptIsOpen(false);
  };

  const onSubmit1 = (data: FormProps) => {
    setCreatePatientModalPromptIsOpen(true);
  };

  const onSubmit = () => {
    const {
      firstName,
      lastName,
      patientAge,
      patientEmail,
      patientPhone,
      patientGenderId,
      aboutPatient,
      maritalStatusId,
      dateOfBirth,
      address,
      patientUniqueID,
    } = getValues();

    const data = {
      patientName: `${firstName} ${lastName}`,
      patientAge,
      patientEmail,
      patientPhone,
      patientGenderId,
      aboutPatient,
      maritalStatusId,
      dateOfBirth,
      address,
      patientUniqueID,
      /**
       * end point is expecting these but they are not in the UI
       */
      patientFacilityCode: 'string',
      bloodGroupId: 0,
      dateOfDeath: '2024-01-28T16:37:55.340Z',
      isActive: true,
      imagePath: 'string',
      /**
       * end point is expecting these but they are not in the UI
       */
    };
    mutateFn(data, () => {
      onClose();
      navigate(`/management/patients/view/${params?.id}`);
    });
  };

  return (
    <>
      <Modal open={createPatientModalPromptIsOpen} onClose={onClose}>
        <AddNewPatientModal {...{ onClose, onSubmit }} />
      </Modal>
      <section className="ce-px ce-py">
        <div className="mx-auto xl:w-[90%] 2xl:w-[80%]">
          <div className="flex justify-between items-center">
            <p className="font-medium">Add a Patient Information</p>
            <button>View Patients List</button>
          </div>

          <form
            className="bg-white mt-4 lg:mt-6 px-4 pb-6 md:px-6 md:pb-8 pt-2 rounded-[20px]"
            onSubmit={handleSubmit(onSubmit1)}
          >
            <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-3 md:gap-6">
              <Controller
                name="registrationDate"
                control={control}
                // defaultValue={0}
                rules={{ required: 'Registration Date is required' }}
                render={({ field: { onChange, value, ref } }) => (
                  <DatePicker
                    label="Registration Date "
                    containerClass="flex-1"
                    onChange={onChange}
                    onAccept={onChange}
                    value={value}
                    inputRef={ref}
                  />
                )}
              />
              <Controller
                name="registrationTime"
                control={control}
                rules={{ required: 'Registration Time is required' }}
                render={({ field: { onChange, value, ref } }) => (
                  <TimePicker
                    label="Registration Time "
                    containerClass="flex-1"
                    // REFACTOR:
                    onChange={onChange}
                    onAccept={onChange}
                    value={value}
                    inputRef={ref}
                  />
                )}
              />
              <Input
                label="Patient ID *"
                placeholder="AGA/453|"
                {...register('patientUniqueID', {
                  required: 'Patient ID is required ',
                })}
              />
              <div>
                <FileUpload
                  uploadIcon={Assets.Icons.UploadIcon1}
                  containerClass="w-6/12"
                  uploadLabel="Click to Upload Image"
                  // onChange={}
                />
              </div>
              <Input
                label="Patitent First Name"
                {...register('firstName', {
                  required: 'Patient First Name is required ',
                })}
              />
              <Input
                label="Patitent Last Name"
                {...register('lastName', {
                  required: 'Patient Last Name is required ',
                })}
              />
              <Input
                label="Email Address"
                {...register('patientEmail', {
                  required: 'Email Address is required ',
                })}
              />
              <Input
                label="Mobile Number"
                {...register('patientPhone', {
                  required: 'Mobile Number is required ',
                })}
              />
              <Controller
                name="patientGenderId"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Select
                    options={[
                      {
                        value: 1,
                        label: 'Male',
                        categoryName: 'Male',
                        categoryId: 1,
                      },
                      {
                        value: 2,
                        label: 'Female',
                        categoryName: 'Female',
                        categoryId: 2,
                      },
                    ]}
                    label="Gender"
                    placeholder="Select Gender"
                    containerClass="flex-1"
                    {...{ field }}
                  />
                )}
              />
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <DatePicker
                    label="Date of Birth"
                    containerClass="flex-1"
                    onChange={onChange}
                    onAccept={onChange}
                    value={value}
                    inputRef={ref}
                  />
                )}
              />
              <Input
                label="Age"
                placeholder="19 years"
                {...register('patientAge', {
                  required: 'Age is required ',
                })}
              />

              <Controller
                name="maritalStatusId"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Select
                    options={[
                      {
                        value: 0,
                        label: 'hey',
                        categoryName: 'categoryName',
                        categoryId: 0,
                      },
                    ]}
                    label="Marital Status"
                    placeholder="Select Marital Status"
                    {...{ field }}
                  />
                )}
              />

              <Input
                label="Address"
                containerClass="md:col-span-2"
                placeholder="No 24, W. F. Kumuyi Street,"
                {...register('address', {
                  required: 'Address is required ',
                })}
              />

              <div className="md:col-span-2 border-b-[2px] pb-1 mt-4 border-b-solid border-borderLine">
                <h4 className="font-bold text-xl">Emergency Contact</h4>
                <p className="text-sm text-greyText2 mt-1">
                  You are to populate the Rebate Amount to efficiency calculate
                  a deduction
                </p>
              </div>

              <Input
                label="Emergency Contact First Name"
                {...register('emergencyContactFirstName', {
                  required: 'Emergency Contact First Name is required ',
                })}
              />
              <Input
                label="Last Name"
                {...register('emergencyContactLastName', {
                  required: 'Last Name is required ',
                })}
              />
              <Input
                label="Contact Number"
                {...register('emergencyContactNumber', {
                  required: 'Contact Number is required ',
                })}
              />
              <Input
                label="Relationship"
                {...register('emergencyContactRelationship', {
                  required: 'Emergency Contact is required ',
                })}
              />
              <Controller
                name="paymentType"
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
                    label="Payment Type"
                    placeholder="Select Payment Type"
                    {...{ field }}
                  />
                )}
              />

              <div className="md:col-span-2 border-b-[2px] pb-1 mt-4 border-b-solid border-borderLine">
                <h4 className="font-bold text-xl">Health History</h4>
                <p className="text-sm text-greyText2 mt-1">
                  You are to populate the Rebate Amount to efficiency calculate
                  a deduction
                </p>
              </div>

              <Input
                label="Reason for Registration"
                containerClass="col-span-2"
                {...register('reasonForRegistration', {
                  required: 'Reason for Registration is required ',
                })}
              />

              <div className="col-span-2 flex flex-col gap-2">
                <p className="">Taking any medications, Currently?</p>
                <div className="flex gap-4">
                  <label className="flex col-span-2 gap-2">
                    <input
                      type="radio"
                      value="yes"
                      {...register('takingMeds', {
                        required: 'Please Check an option',
                      })}
                      defaultChecked
                    />
                    <p>Yes</p>
                  </label>
                  <label className="flex col-span-2 gap-2 ">
                    <input
                      type="radio"
                      value="no"
                      {...register('takingMeds', {
                        required: 'Please Check an option',
                      })}
                    />
                    <p>No</p>
                  </label>
                </div>
              </div>

              <TextArea
                rows={5}
                label="Additional Notes"
                placeholder="Leave a Note"
                containerClass="md:col-span-2"
                {...register('aboutPatient', {
                  required: 'Notes is required ',
                })}
              />

              <Input
                label="Reason for Registration"
                containerClass="md:col-span-2"
              />
            </div>
            <Button
              className="my-4"
              loading={isLoading}
              label="Create Patient Record"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default NewPatient;
