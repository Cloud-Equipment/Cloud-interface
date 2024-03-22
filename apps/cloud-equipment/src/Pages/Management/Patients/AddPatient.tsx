import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Modal } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import * as Assets from '@cloud-equipment/assets';
import {
  Button,
  Input,
  TextArea,
  DatePicker,
  FileUpload,
  Select,
  TimePicker,
} from '@cloud-equipment/ui-components';
import { AddPatientModal } from '../../../Modals';
import { IAppState } from '../../../Store/store';
import queries from '../../../services/queries/managePatients';
import { Gender, MaritalStatus } from '../../../constants';

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
  emergencyContactFirstname: string;
  emergencyContactLastName: string;
  emergencyContactNumber: string;
  emergencyContactRelationship: string;
  paymentType: string;
  reasonForRegistration: string;
  takingMedication: string;
  additionalNotes: string;
  // registrationDate: string;
  patientUniqueID: string;
  //
  // registrationTime: any;
  // registrationDate: any;
  profilePhoto: File;
  [key: string]: any;
}

const NewPatient = () => {
  const { user } = useSelector((state: IAppState) => state.auth);

  const navigate = useNavigate();
  const params = useParams();

  const { useCreatePatient } = queries;
  const { mutateFn, isLoading } = useCreatePatient();

  const { register, handleSubmit, control, getValues, watch, setValue } =
    useForm<FormProps>();

  const [createPatientModalPromptIsOpen, setCreatePatientModalPromptIsOpen] =
    useState(false);

  useEffect(() => {
    if (user?.FACILITY_NAME) {
      setValue(
        'patientUniqueID',
        `${generateFacilityCodeFacility(user?.FACILITY_NAME)}/`
      );
    }
  }, [user]);

  useEffect(() => {
    if (watch('dateOfBirth')) {
      const age = calculateAge(watch('dateOfBirth'));
      setValue('patientAge', age);
    }
  }, [watch('dateOfBirth')]);

  const onClose = () => {
    setCreatePatientModalPromptIsOpen(false);
  };

  const onSubmit1 = () => {
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
      // patientUniqueID,
      emergencyContactFirstname,
      emergencyContactLastName,
      emergencyContactNumber,
      emergencyContactRelationship,
      paymentType,
      reasonForRegistration,
      takingMedication,
      additionalNotes,
      profilePhoto,
      // registrationDate,
    } = getValues();

    const data: { [key: string]: any } = {
      patientName: `${firstName} ${lastName}`,
      patientAge,
      patientEmail,
      patientPhone,
      patientGenderId,
      aboutPatient,
      maritalStatusId,
      dateOfBirth,
      address,
      // patientUniqueID,
      emergencyContactFirstname,
      emergencyContactLastName,
      emergencyContactNumber,
      emergencyContactRelationship,
      paymentType,
      reasonForRegistration,
      takingMedication: takingMedication === 'no' ? false : true,
      additionalNotes,
      patientFacilityCode: user?.FACILITY_ID || '',
      facilityId: user?.FACILITY_ID || '',
      bloodGroupId: 0,
      isActive: false,
      imagePath: null,
      profilePhoto,
    };

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    mutateFn(formData, (res) => {
      onClose();
      navigate(`/management/patient/${res.data.patientUniqueID}`);
    });
  };

  const calculateAge = (date: string) => {
    const selectedDate = dayjs(date);
    const currentDate = dayjs();
    const age = currentDate.diff(selectedDate, 'year');
    return age;
  };

  /**
   *
   * @param facilityName
   * @returns facility code suggestions based on facility name
   */
  const generateFacilityCodeFacility = (facilityName: string) => {
    const capitalizedFacility = facilityName.toLocaleUpperCase();
    // if one word
    const splitWords = capitalizedFacility.split(' ');
    const len = splitWords.length;
    if (len <= 2) {
      //if two words
      if (len === 2) {
        return `${splitWords[0][0]}${splitWords[0][1]}${splitWords[1][0]}`.toLocaleUpperCase();
      }
      return capitalizedFacility.slice(0, 3);
    }
    const firstLetterOfSplitWords = splitWords
      .map((val) => val[0].toLocaleUpperCase())
      .join('');
    return firstLetterOfSplitWords;
  };

  return (
    <>
      <Modal open={createPatientModalPromptIsOpen} onClose={onClose}>
        <AddPatientModal {...{ onClose, onSubmit }} />
      </Modal>
      <section className="ce-px ce-py">
        <div className="mx-auto xl:w-[90%] 2xl:w-[80%]">
          <div className="flex justify-between items-center">
            <p className="font-medium font-manrope text-2xl leading-[36px] text-neutral-350">
              Add a Patient Information
            </p>
            <Button
              variant="tertiary"
              label="View Patients List"
              onClick={() => navigate('/management/patients')}
              icon={Assets.Icons.ExclamationIcon}
            />
          </div>

          <form
            className="bg-white mt-4 lg:mt-6 px-4 pb-6 md:px-6 md:pb-8 pt-2 rounded-[20px]"
            onSubmit={handleSubmit(onSubmit1)}
          >
            <div className="max-w-[1000px] mx-auto pt-10 grid md:grid-cols-2 gap-3 md:gap-6">
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
                  setFile={(file) => setValue('profilePhoto', file)}
                />
              </div>
              <Input
                label="Patient First Name"
                {...register('firstName', {
                  required: 'Patient First Name is required ',
                })}
              />
              <Input
                label="Patient Last Name"
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
                    options={Gender}
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
                disabled
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
                    options={MaritalStatus}
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
                {...register('emergencyContactFirstname', {
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
                defaultValue={'Card'}
                render={({ field }) => (
                  <Select
                    options={[
                      {
                        value: 'Card',
                        label: 'Card',
                        categoryName: 'Card',
                        categoryId: 'Card',
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
                      {...register('takingMedication', {
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
                      {...register('takingMedication', {
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
                {...register('additionalNotes', {
                  required: 'Notes is required ',
                })}
              />
            </div>
            <Button
              loading={isLoading}
              className="my-4"
              label="Create Patient Record"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default NewPatient;
