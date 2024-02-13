import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Checkbox,
  FormControlLabel,
  ListItemText,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Select,
  Autocomplete,
  TextField,
} from '@mui/material';
import * as Assets from '@cloud-equipment/assets';
import {
  // DatePicker,
  Input,
  // Select,
  // TimePicker,
  // TextArea,
  Button,
} from '@cloud-equipment/ui-components';
import { IAppointmentCreate } from '../../services/queries/appointments/types';
import medserviceQueries from '../../services/queries/medservices';
import patientQueries from '../../services/queries/patients';
import apppointmentQueries from '../../services/queries/appointments';
import { IMedservice, IPatient } from '@cloud-equipment/models';
import { useSelector } from 'react-redux';
import { IAppState } from '../../Store/store';
import PhoneInput from 'react-phone-input-2';

const AppointmentModal = ({
  onClose,
  discountData,
}: {
  onClose: () => void;
  discountData?: any;
}) => {
  const userDetails = useSelector((state: IAppState) => state.auth.user);

  const { useCreateAppointment } = apppointmentQueries;
  const { mutateFn: mutateFn_CreateAppointment } = useCreateAppointment();

  const { useGetMedservicesForFacility } = medserviceQueries;
  const { data: proceduresList, isLoading } = useGetMedservicesForFacility(
    '/service-manager/medServices/getall'
  );

  const [createPromptIsOpen, setCreatePromptIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    watch,
    setValue,
  } = useForm<
    IAppointmentCreate & {
      patientName: string;
      patientNumber: string;
      patientEmail: string;
      patientGenderId: number;
      patientAge: number;
      maritalStatus: number;
      patientBloodGroup: number;
      pulse: string;
      bloodPressure: string;
    }
  >({
    defaultValues: discountData ? discountData : {},
  });

  const onCloseCreateModal = () => {
    setCreatePromptIsOpen(false);
    onClose();
  };

  const onSubmit = () => {
    setCreatePromptIsOpen(true);
  };

  const submitData = () => {
    mutateFn_CreateAppointment(
      {
        ...getValues(),
        facilityId: userDetails?.FACILITY_ID as string,
        testIds: selectedProcedures,
        doctorId: '1',
        takingMeds: JSON.parse(getValues().takingMeds as unknown as string),
      },
      () => triggerCloseAfterSuccess()
    );
  };

  const triggerCloseAfterSuccess = () => {
    setCreatePromptIsOpen(false);
    onClose();
  };

  const [selectedProcedures, setSelectedProcedures] = useState<number[]>([]);

  const handleChange_procedures = (
    event: SelectChangeEvent<typeof selectedProcedures>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedProcedures(value as number[]);
  };

  const renderSelectedProcedures = (selected: number[]) => {
    let ans = '';
    selected.forEach((x, index) => {
      ans =
        ans +
        (index ? ', ' : '') +
        proceduresList?.find((r: IMedservice) => r.medServiceId === x)
          ?.medServiceName;
    });
    return ans;
  };

  //   patients
  const patientId = watch('patientId');
  const [patientName, setPatientName] = useState('');

  const { useGetPatientById, useSearchPatientByName } = patientQueries;
  const { mutateFn: mutateFn_fetchPatientById } = useGetPatientById(patientId);
  const { data: patientsFound, mutateFn: mutateFn_fetchPatientByName } =
    useSearchPatientByName(patientName);

  const handleSelectedPatientFromSearch = (selectedPatient: IPatient) => {
    setValue('patientId', selectedPatient?.patientUniqueID);
    setValue('patientName', selectedPatient?.patientName);
    setValue('patientNumber', selectedPatient?.patientPhone);
    setValue('patientAge', selectedPatient?.patientAge);
    setValue('patientGenderId', selectedPatient?.patientGenderId);
    setValue('patientEmail', selectedPatient?.patientEmail);
  };

  const handlePatientFound = (patient: IPatient) => {
    setValue('patientNumber', patient.patientPhone);
    setValue('patientAge', patient.patientAge);
    // setValue('patientAddress', patient.patientAddress);
    setValue('patientGenderId', patient.patientGenderId);
    setValue('patientEmail', patient.patientEmail);
  };

  const clearPatientFound = () => {
    setValue('patientNumber', '');
    setValue('patientAge', '' as unknown as number);
    setValue('patientGenderId', '' as unknown as number);
    setValue('patientEmail', '');
  };

  useEffect(() => {
    if (patientId && !patientName) {
      mutateFn_fetchPatientById({}, (res) => {
        if (res.data) {
          handlePatientFound(res.data);
        } else {
          clearPatientFound();
        }
      });
    } else {
      if (patientName) {
        mutateFn_fetchPatientByName({}, (res) => {});
      }
    }
  }, [patientId, patientName]);

  return (
    <>
      <div className="bg-white px-6 py-10 rounded-tl-[20px] rounded-bl-[20px] right-modal overflow-y-auto">
        {!createPromptIsOpen ? (
          <>
            <div className="flex items-center justify-between mb-10">
              <h4 className="text-2xl">
                {discountData
                  ? 'Edit Appointment'
                  : 'New Appointment Request Form'}
              </h4>
              <button
                onClick={() => {
                  onClose();
                }}
                className="btn-icon"
              >
                <img src={Assets.Icons.BoxCloseIcon} alt="" />
              </button>
            </div>

            {/* {Object.keys(getValues()).map(function (key) {
          return (
            <div>
              {key}: {(getValues() as unknown as any)[key]}
            </div>
          );
        })} */}

            <form
              className="grid md:grid-cols-2 gap-5 mt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-input-label-holder">
                <label>Patient Name</label>
                <Autocomplete
                  freeSolo
                  options={patientsFound ?? []}
                  onInputChange={(event, newInputValue) => {
                    setPatientName(newInputValue);
                  }}
                  onChange={(event, selectedOption) => {
                    handleSelectedPatientFromSearch(
                      selectedOption as unknown as any
                    );
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                  getOptionLabel={(option) => {
                    return (option as IPatient).patientName;
                  }}
                  renderOption={(props, option: any) => (
                    <MenuItem {...props}>
                      <div className="rounded flex items-center space-x-5 px-3 py-2">
                        <img
                          src={Assets.Icons.DummyUser}
                          className="w-10 rounded-[10px]"
                          alt=""
                        />

                        <div>
                          <p className="font-semibold text-sm">
                            {option.patientName}
                          </p>
                          <p className="text-xs mt-2">
                            {option.patientFacilityCode.substr(0, 5)} .{' '}
                            {option.patientAge} Years
                          </p>
                        </div>
                      </div>
                    </MenuItem>
                  )}
                />
              </div>

              <div className="form-input-label-holder">
                <label>Reason for Visiting</label>
                <Controller
                  name="visitReasonId"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value={0} disabled>
                        Select Reason for Visiting
                      </MenuItem>
                      <MenuItem value={1}>Run Diagnostics</MenuItem>
                      <MenuItem value={2}>Result Collection</MenuItem>
                      <MenuItem value={3}>Others</MenuItem>
                    </Select>
                  )}
                />
              </div>

              <Input
                label="Patient ID"
                placeholder="AGA/453"
                {...register('patientId', {
                  required: 'Patient ID is required ',
                })}
              />

              <Input
                label="Patient Name"
                placeholder="Adepoju Deborah"
                {...register('patientName', {
                  required: 'Patient Name is required ',
                })}
              />

              <Input
                label="Patient Mobile Number"
                placeholder="+2348138383838"
                {...register('patientNumber')}
              />

              <Input
                label="Email Address"
                placeholder="adepoju@cloud.io"
                {...register('patientEmail')}
              />

              <div className="form-input-label-holder">
                <label>Gender</label>
                <Controller
                  name="patientGenderId"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="Select Gender" {...field}>
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
                {...register('patientAge', {
                  required: 'Patient Age is required ',
                })}
              />

              <div className="form-input-label-holder">
                <label>Marital Status</label>
                <Controller
                  name="maritalStatus"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value={0} disabled>
                        Select Marital Status
                      </MenuItem>
                      <MenuItem value={1}>Single</MenuItem>
                      <MenuItem value={2}>Married</MenuItem>
                    </Select>
                  )}
                />
              </div>

              <div className="form-input-label-holder">
                <label>Procedures</label>
                <Select
                  multiple
                  name="Procedures"
                  value={selectedProcedures}
                  onChange={(val: SelectChangeEvent<number[]>) =>
                    handleChange_procedures(val)
                  }
                  renderValue={renderSelectedProcedures}
                >
                  {proceduresList?.map((medservice: IMedservice) => (
                    <MenuItem
                      key={medservice.medServiceId}
                      value={medservice.medServiceId}
                    >
                      <Checkbox
                        checked={
                          selectedProcedures.findIndex((x) => {
                            return x === medservice.medServiceId;
                          }) > -1
                        }
                      />
                      <ListItemText>{medservice.medServiceName}</ListItemText>
                      <span>₦{medservice.price}</span>
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className="form-input-label-holder">
                <label>Patient Blood Group</label>
                <Controller
                  name="patientBloodGroup"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Select placeholder="Select Blood Group" {...field}>
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
                {...register('bloodPressure', {})}
              />

              <Input
                label="Pulse"
                placeholder="80/120"
                {...register('pulse', {})}
              />

              <div className="md:col-span-2">
                <p>Taking any medications currently?</p>

                <Controller
                  name="takingMeds"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        control={<Radio value={true} />}
                        label="True"
                      />
                      <FormControlLabel
                        control={<Radio value={false} />}
                        label="False"
                      />
                    </RadioGroup>
                  )}
                />
              </div>

              <Input
                label="Amount"
                placeholder="NGN 5,000"
                type="number"
                {...register('total', {
                  required: 'Total Amount is required ',
                })}
              />

              <Input
                containerClass="md:col-span-2"
                label="Notes"
                placeholder="Leave a note"
                {...register('notes', {})}
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

      {/* <Modal open={createDiscountModalPromptIsOpen} onClose={onClose}>
        <AddNewDiscountModal
          isLoading={isLoading}
          onSubmit={onSubmit}
          {...{ onClose }}
        />
      </Modal> */}
    </>
  );
};

export default AppointmentModal;
