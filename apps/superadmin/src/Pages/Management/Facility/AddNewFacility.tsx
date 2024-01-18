import { Controller, useForm } from 'react-hook-form';

import {
  Input,
  TextArea,
  DatePicker,
  FileUpload,
  Select,
} from '../../../components';
import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';

interface FormProps {
  facilityTypeId: number;
  facilityName: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: number;
  city: string;
  stateId: number;
  countryId: number;
  isActive: boolean;
  dateCreated: string | Date;
  rebatePercent: number;
  logoPath: string;
  [key: string]: any;
}

const AddNewFacility = () => {
  const { register, handleSubmit, control, getValues, setValue, watch } =
    useForm<FormProps>();

  const onSubmit = (data: FormProps) => {
    console.log('data', data);
  };

  return (
    <section className="ce-px ce-py">
      <div className="p-[16px] mt-[20px] rounded-[20px]">
        <h4 className="ce-heading-2">Management &gt; Facilities </h4>
        <div className="min-h-screen px-8 py-3 rounded-[20px] mt-10  bg-white border shadow-pageFormShadow">
          <h4 className="">Create New Facility</h4>
          <form
            className=""
            onSubmit={handleSubmit(onSubmit, (err) =>
              console.log('error', err)
            )}
          >
            {/* REFACTOR: the layout is similar, try to compose it */}
            <div className="mb-10">
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
                    // onChange={}
                  />
                </div>
                <Input
                  label="Facility ID"
                  containerClass="flex-1"
                  {...register('facilityTypeId', {
                    required: 'Facility ID is required ',
                  })}
                />
              </div>
              <Input
                label="Name of Facility"
                containerClass="flex-1"
                {...register('facilityName', {
                  required: 'Facility Name is required ',
                })}
              />
              <TextArea
                rows={5}
                label="Address of Facility"
                placeholder="Address of Facility"
                containerClass="mt-1"
                {...register('addressLine1', {
                  required: 'Facility Name is required ',
                })}
              />
              <div className="flex gap-24 my-4">
                <Controller
                  name="dateCreated"
                  control={control}
                  // defaultValue={0}
                  render={({ field }) => (
                    <DatePicker
                      label="Registration Date "
                      containerClass="flex-1"
                      {...{ field }}
                    />
                  )}
                />

                <Controller
                  name="countryId"
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
                      label="Country "
                      placeholder="Select Country"
                      containerClass="flex-1"
                      {...{ field }}
                    />
                  )}
                />
              </div>
              <div className="flex gap-24 my-4">
                <Controller
                  name="stateId"
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
                      label="State"
                      placeholder="Select State"
                      containerClass="flex-1"
                      {...{ field }}
                    />
                  )}
                />
                <Input
                  label="City"
                  containerClass="flex-1"
                  placeholder="Enter City"
                  {...register('city', {
                    required: 'City is required ',
                  })}
                />
              </div>
              <div className="flex gap-24 my-4">
                <Input
                  label="Email of Facility"
                  containerClass="flex-1"
                  {...register('facilityEmail', {
                    required: 'Facility Email is required ',
                  })}
                />
                <Input
                  label="Phone Number of facility"
                  containerClass="flex-1"
                  {...register('facilityPhoneNo', {
                    required: 'Facility Phone Number is required ',
                  })}
                />
              </div>
              <div className="flex gap-24 my-4">
                <Controller
                  name="facilityTypeId"
                  control={control}
                  defaultValue={0}
                  rules={{ required: 'Facility Type is required' }}
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
                      label="Facility Type"
                      placeholder="Select Facility Type"
                      containerClass="flex-1"
                      {...{ field }}
                    />
                  )}
                />
                <Input
                  label="Rebate Percentage"
                  placeholder="Input Rebate Percentage"
                  containerClass="flex-1"
                  {...register('rebatePercent', {
                    required: 'Rebate Percentage is required ',
                  })}
                />
              </div>
              <div className="flex gap-24 my-4">
                <Input
                  label="Number of User "
                  placeholder="Input Number of User"
                  containerClass="flex-1"
                  {...register('rebatePercent', {
                    required: 'Rebate Percentage is required ',
                  })}
                />
                <Input
                  label="Phone Number of Admin "
                  placeholder="+234 08143626356"
                  containerClass="flex-1"
                  {...register('Admin Phone Number', {
                    required: 'Admin Phone Number is required ',
                  })}
                />
              </div>
            </div>
            <div className="mb-10">
              <h5 className="">Admin Information</h5>
              <p className="mb-5 border-b-2">
                You are to populate the Admin Information Aspect
              </p>
              <div className="flex gap-24">
                <div className="flex-1">
                  <FileUpload
                    uploadIcon={Assets.Icons.UploadIcon1}
                    containerClass="w-6/12"
                    uploadLabel="Click to Upload Image"
                    // onChange={}
                  />
                </div>
                <Input
                  label="Admin First Name*"
                  placeholder=""
                  containerClass="flex-1"
                  {...register('adminFirstName', {
                    required: "Admin's First Name is required ",
                  })}
                />
              </div>
              <div className="flex gap-24 my-4">
                <Input label="Admin Last Name*" containerClass="flex-1" />
                <Input
                  label="Admin Email"
                  placeholder="myname@example.com"
                  containerClass="flex-1"
                  {...register('adminLastName', {
                    required: "Admin's Last Name is required ",
                  })}
                />
              </div>
              <div className="flex gap-24 my-4">
                <Input
                  label="Admin Role"
                  containerClass="flex-1"
                  placeholder="Enter your Admin role in full"
                  {...register('adminRole', {
                    required: "Admin's Role is required ",
                  })}
                />
                <div className="flex-1"></div>
              </div>
              <TextArea
                rows={5}
                label="Comment"
                placeholder="Leave a Note"
                containerClass="my-1"
                {...register('comment', {
                  required: 'comment ',
                })}
              />
            </div>
            <div className="mb-10">
              <h5 className="">Document Upload</h5>
              <p className="mb-5 border-b-2">
                You are to populate the Admin Information Aspect
              </p>
              <div className="flex gap-24">
                <FileUpload
                  uploadIcon={Assets.Icons.UploadIcon2}
                  containerClass="flex-1"
                  uploadLabel="Upload a copy of Company/Business registration<br/> Certificate"
                  uploadRestrictionText="PNG, JPG up to 5MB"
                  borderStyle="solid"
                  borderWidth={1}
                  color="#1A1A1A"
                  // onChange={}
                />
                <FileUpload
                  uploadIcon={Assets.Icons.UploadIcon2}
                  containerClass="flex-1"
                  uploadLabel="Upload a Government Issued Identification"
                  uploadRestrictionText="PNG, JPG up to 5MB"
                  borderStyle="solid"
                  borderWidth={1}
                  color="#1A1A1A"
                />
              </div>
            </div>
            <p className="my-3">Add New Document</p>
            <Button
              // className="bg-primary-150 hover:opacity-85 border-none text-white rounded-xl"
              label="Create Facility"
              variant="primary"
              type="submit"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddNewFacility;
