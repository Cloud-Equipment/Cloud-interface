import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import * as Assets from '@cloud-equipment/assets';
import {
  // DatePicker,
  Input,
  // Select,
  // TimePicker,
  // TextArea,
  Button,
  PhoneInputField,
  SearchableInput,
  MultiSelectWithCheckbox,
  TextArea,
} from '@cloud-equipment/ui-components';
import { IAppointmentCreate } from '../../services/queries/appointments/types';
import medserviceQueries from '../../services/queries/medservices';
import patientQueries from '../../services/queries/managePatients';
import apppointmentQueries from '../../services/queries/appointments';
import refererQueries from '../../services/queries/manageReferers';
import { IMedservice, IPatient } from '@cloud-equipment/models';
import { useSelector } from 'react-redux';
import { IAppState } from '../../Store/store';
import { toast } from 'react-toastify';

const AppointmentModal = ({ onClose }: { onClose: () => void }) => {
  const userDetails = useSelector((state: IAppState) => state.auth.user);

  //   patients , search patients and create patients related data and functions
  const [patientName, setPatientName] = useState('');
  const [existingPatientId, setExistingPatientId] = useState<string | null>(
    null
  );

  const { useSearchPatientByName, useCreatePatient } = patientQueries;
  const { data: patientsFound, mutateFn: mutateFn_fetchPatientByName } =
    useSearchPatientByName(patientName, userDetails?.FACILITY_ID as string);

  const { mutateFn: mutateFn_CreatePatient, isLoading: isCreatingPatient } =
    useCreatePatient();

  const handleSelectedPatientFromSearch = (selectedPatient: IPatient) => {
    // setValue('patientId', selectedPatient?.patientUniqueID);
    setValue('patientName', selectedPatient?.patientName);
    setValue('patientNumber', selectedPatient?.patientPhone);
    setValue('patientAge', selectedPatient?.patientAge);
    setValue('patientGenderId', selectedPatient?.patientGenderId);
    setValue('patientEmail', selectedPatient?.patientEmail);

    setExistingPatientId(selectedPatient?.patientUniqueID);
  };

  //   doctors , search doctors and create doctors related data and functions
  const [refererName, setRefererName] = useState('');
  const [existingRefererId, setExistingRefererId] = useState<string | null>(
    null
  );

  const { useSearchRefererByName } = refererQueries;
  const { data: referersFound } = useSearchRefererByName(refererName);

  // const { mutateFn: mutateFn_CreatePatient, isLoading: isCreatingPatient } =
  //   useCreatePatient();

  const handleSelectedRefererFromSearch = (selectedReferer: any) => {
    // setValue('patientId', selectedPatient?.patientUniqueID);
    // setValue('patientName', selectedPatient?.patientName);
    // setValue('patientNumber', selectedPatient?.patientPhone);
    // setValue('patientAge', selectedPatient?.patientAge);
    // setValue('patientGenderId', selectedPatient?.patientGenderId);
    // setValue('patientEmail', selectedPatient?.patientEmail);
    // setExistingRefererId(selectedPatient?.patientUniqueID);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clearPatientFound = () => {
    setValue('patientNumber', '');
    setValue('patientAge', '' as unknown as number);
    setValue('patientGenderId', '' as unknown as number);
    setValue('patientEmail', '');

    setExistingPatientId(null);
  };

  useEffect(() => {
    if (patientName) {
      mutateFn_fetchPatientByName({}, (res) => {
        if (!res?.length) {
          setExistingPatientId(null);
        }
      });
    }
  }, [patientName]);

  const { useCreateAppointment } = apppointmentQueries;
  const { mutateFn: mutateFn_CreateAppointment } = useCreateAppointment();

  const { useGetMedservicesForFacility } = medserviceQueries;
  const { data: proceduresList, isLoading } = useGetMedservicesForFacility(
    '/service-manager/medServices/getall'
  );

  const [createPromptIsOpen, setCreatePromptIsOpen] = useState(false);

  const { register, handleSubmit, control, getValues, setValue } =
    useForm<IAppointmentCreate>({
      defaultValues: {},
    });

  const onSubmit = () => {
    setCreatePromptIsOpen(true);
  };

  const submitData = () => {
    const createAppointment = (patientId: string) => {
      const appointmentData = {
        ...getValues(),
        facilityId: userDetails?.FACILITY_ID as string,
        testIds: selectedProcedures,
        // this was done because the value comes as a string and I have no idea why
        takingMeds: JSON.parse(
          (getValues().takingMeds as unknown as string) ?? 'false'
        ),
        appointmentDate: new Date(),
        patientId: patientId,
      };
      mutateFn_CreateAppointment(appointmentData, () => {
        toast.success('Appointment Created Successfully');
        triggerCloseAfterSuccess();
      });
    };

    if (existingPatientId) {
      // create appointment straight
      createAppointment(existingPatientId);
    } else {
      // create patient first
      const {
        patientAge,
        patientEmail,
        patientGenderId,
        patientNumber,
        maritalStatusId,
        takingMeds,
      } = getValues();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = {
        patientName: `${patientName}`,
        patientAge,
        patientEmail,
        patientPhone: patientNumber,
        patientGenderId,
        maritalStatusId,
        takingMedication: JSON.parse(
          (getValues().takingMeds as unknown as string) ?? 'false'
        ),
        patientFacilityCode: userDetails?.FACILITY_ID as string,
        facilityId: userDetails?.FACILITY_ID as string,
        isActive: false,
      };
      mutateFn_CreatePatient(data, (res) => {
        console.log({ patientId: res.data.patientUniqueID });
        if (res.data?.patientUniqueID) {
          setExistingPatientId(res.data.patientUniqueID);
          createAppointment(res.data.patientUniqueID);
        }
      });
    }
  };

  const triggerCloseAfterSuccess = () => {
    setCreatePromptIsOpen(false);
    onClose();
  };

  const [selectedProcedures, setSelectedProcedures] = useState<number[]>([]);

  return (
    <>
      <div className="bg-white px-6 py-10 rounded-tl-[20px] rounded-bl-[20px] right-modal overflow-y-auto">
        {!createPromptIsOpen ? (
          <>
            <div className="flex items-center justify-between mb-10">
              <h4 className="text-2xl">{'New Appointment Request Form'}</h4>
              <button
                onClick={() => {
                  onClose();
                }}
                className="btn-icon"
              >
                <img src={Assets.Icons.BoxCloseIcon} alt="" />
              </button>
            </div>

            <form
              className="grid md:grid-cols-2 gap-5 mt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <SearchableInput
                options={patientsFound ?? []}
                label="Patient Name"
                onInputChange={(newValue) => setPatientName(newValue)}
                inputValue={patientName}
                onOptionSelect={(option) =>
                  handleSelectedPatientFromSearch(option)
                }
                optionLabelKey="patientName"
              />

              <>
                {/* <div className="form-input-label-holder">
                <label>Reason for Visiting</label>
                <Controller
                  name="visitReasonId"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} required>
                      <MenuItem value={0} disabled>
                        Select Reason for Visiting
                      </MenuItem>
                      <MenuItem value={2}>Run Diagnostics</MenuItem>
                      <MenuItem value={3}>Result Collection</MenuItem>
                      <MenuItem value={4}>Others</MenuItem>
                    </Select>
                  )}
                />
              </div> */}
              </>

              <PhoneInputField
                control={control}
                label="Patient Mobile Number"
                name="patientNumber"
                readonly={!!existingPatientId}
              />

              <Input
                label="Email Address"
                placeholder="adepoju@cloud.io"
                readOnly={!!existingPatientId}
                {...register('patientEmail')}
              />

              <div className="form-input-label-holder">
                <label>Gender</label>
                <Controller
                  name="patientGenderId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      readOnly={!!existingPatientId}
                      placeholder="Select Gender"
                      {...field}
                    >
                      <MenuItem value={''}>Select Gender</MenuItem>
                      <MenuItem value={1}>Male</MenuItem>
                      <MenuItem value={2}>Female</MenuItem>
                    </Select>
                  )}
                />
              </div>

              <Input
                label="Age of the Patient"
                placeholder="15"
                type="number"
                readOnly={!!existingPatientId}
                {...register('patientAge', {
                  required: 'Patient Age is required ',
                })}
              />

              <div className="form-input-label-holder">
                <label>Marital Status</label>
                <Controller
                  name="maritalStatusId"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Select readOnly={!!existingPatientId} {...field}>
                      <MenuItem value={0} disabled>
                        Select Marital Status
                      </MenuItem>
                      <MenuItem value={1}>Single</MenuItem>
                      <MenuItem value={2}>Married</MenuItem>
                    </Select>
                  )}
                />
              </div>

              <MultiSelectWithCheckbox
                label="Procedures"
                options={
                  proceduresList?.map((x) => ({
                    id: x.medServiceId.toString(),
                    name: x.medServiceName,
                    price: x.price.toString(),
                  })) ?? []
                }
                onSelectionChange={(x) => {
                  setSelectedProcedures(x.map((r) => Number(r)));
                }}
              />

              <div className="form-input-label-holder">
                <label>Patient Blood Group</label>
                <Controller
                  name="patientBloodGroup"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Select
                      readOnly={!!existingPatientId}
                      placeholder="Select Blood Group"
                      {...field}
                    >
                      <MenuItem value={0} disabled>
                        Select Blood Group
                      </MenuItem>
                      <MenuItem value={1}>A</MenuItem>
                      <MenuItem value={2}>AB</MenuItem>
                    </Select>
                  )}
                />
              </div>

              <Input
                label="Blood Pressure"
                placeholder="80/120"
                readOnly={!!existingPatientId}
                {...register('bloodPressure', {})}
              />

              <Input
                label="Pulse"
                placeholder="80/120"
                readOnly={!!existingPatientId}
                {...register('pulse', {})}
              />

              <div className="md:col-span-2">
                <p>Taking any medications currently?</p>

                <Controller
                  name="takingMeds"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup defaultValue={false} row {...field}>
                      <FormControlLabel
                        control={
                          <Radio readOnly={!!existingPatientId} value={true} />
                        }
                        label="True"
                      />
                      <FormControlLabel
                        control={
                          <Radio readOnly={!!existingPatientId} value={false} />
                        }
                        label="False"
                      />
                    </RadioGroup>
                  )}
                />
              </div>

              <Input
                containerClass="md:col-span-2"
                label="Notes"
                placeholder="Leave a note"
                {...register('notes', {})}
              />

              <SearchableInput
                options={referersFound ?? []}
                label="Referer Name"
                onInputChange={(newValue) => setRefererName(newValue)}
                inputValue={refererName}
                onOptionSelect={(option) =>
                  handleSelectedRefererFromSearch(option)
                }
                optionLabelKey="refererName"
              />

              <Input
                label="Referer's Hospital/Laboratory"
                placeholder="Fountain Care"
                {...register('refererHospital')}
              />

              <Input
                label="Referer Email Address"
                placeholder="email@example.io"
                {...register('refererEmail')}
              />

              <PhoneInputField
                control={control}
                label="Referer Phone Number"
                name="refererPhone"
              />

              <TextArea
                label="Remarks"
                placeholder="Leave a message for the diagnostic center"
                {...register('remarks')}
                containerClass="md:col-span-2"
                rows={5}
              />

              <Controller
                name="isPaid"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    className="md:col-span-2"
                    control={<Checkbox defaultChecked={false} {...field} />}
                    label="Pay before running the test?"
                  />
                )}
              />

              <Button
                loading={isLoading}
                className="md:w-[270px]"
                label="Book an Appointment"
              />
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <img src={Assets.Icons.ModalConfirm} alt="confirm icon" />

            <p className="text-center">
              Are you sure you want to book this appointment
            </p>

            {!existingPatientId ? (
              <p className="text-center mt-2">
                Kindly note that you are creating a new patient
              </p>
            ) : (
              <></>
            )}

            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="ce-btn-text"
                onClick={() => {
                  setCreatePromptIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ce-btn-outline !border-greenText hover:bg-greenText text-greenText"
                onClick={() => submitData()}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AppointmentModal;
