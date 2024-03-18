import { useNavigate, useParams } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { useSelector } from 'react-redux';

import * as Assets from '@cloud-equipment/assets';
import {
  Button,
  FileUploadWithModal,
  Table,
} from '@cloud-equipment/ui-components';
import { formatDate } from '@cloud-equipment/utils';
import { IAppState } from '../../../Store/store';

import queries from '../../../services/queries/managePatients';
import { GenderMapping } from '../../../constants';

type PatientTableColumns = { [key: string]: string } & {
  lastLogin: string;
  elipsis: 'elipsis';
};

const columnHelper = createColumnHelper<PatientTableColumns>();

const columns = [
  columnHelper.accessor('dateAndTime', {
    header: 'Date & Time',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('procedure', {
    header: 'Procedure/Test Ordered',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('referrerName', {
    header: 'Referrer’s Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('referrerHospital', {
    header: 'Referrer’s Hospital',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
  }),
];

const ViewPatient = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userDetails = useSelector((state: IAppState) => state.auth.user);

  const { useGetPatientById, useGetPatientReport } = queries;
  const { data, isLoading } = useGetPatientById(
    `/patient/getpatientbyuniqueid?patientUniqueId=${params.id}&facilityId=${userDetails?.FACILITY_ID}`,
    { enabled: !!params.id }
  );
  const { data: patientReport, isLoading: patientReportLoading } =
    useGetPatientReport(
      `/patient/getpatientreport?patientId=${params.id}&facilityId=${userDetails?.FACILITY_ID}`,
      { enabled: !!params.id }
    );

  if (isLoading)
    return (
      <section className="ce-px ce-py">
        <h2>Loading...</h2>
      </section>
    );

  return (
    <>
      <section className="ce-px ce-py">
        <div className="bg-white rounded-[20px] px-4 py-8">
          <div className="flex justify-between">
            <h3 className="text-2xl">Profile</h3>

            <button onClick={() => navigate(-1)}>
              <img src={Assets.Icons.BoxCloseIcon} alt="" />
            </button>
          </div>

          <div className="mt-10">
            <FileUploadWithModal
              uploadIcon={Assets.Icons.UploadIcon1}
              containerClass="w-[150px]"
              uploadLabel="Click to Upload Image"
              onClick={(cb) => {
                cb();
              }}
              // onChange={}
            />

            <p className="text-greyText2 mt-3">
              User ID: {data?.patientFacilityCode || '-'}
            </p>
            <p className="font-semibold text-lg">{data?.patientName || '-'}</p>

            <div className="mt-10 flex items-center gap-3 flex-wrap">
              <Button label="New Appointment" onClick={() => {}} />
              <Button variant="tertiary" label="Refer Patient" className="" />
              <Button
                label="Edit Profile"
                className="border-primary-150 text-secondary-400"
                variant="neutral"
                onClick={() =>
                  navigate(`/management/patient/edit/${params.id}`)
                }
              />
            </div>
          </div>

          <h5 className="text-lg font-medium mt-10">Patient Information</h5>

          <div className="mt-10 [box-shadow:0px_4px_12px_0px_#0D5F5026] rounded-lg py-4 px-16 grid md:grid-cols-3 2xl:grid-cols-6 gap-4 2xl:gap-10">
            <TitleSubtitle
              title="Registration Date & Time"
              subtitle={`${formatDate(data?.registrationDate) || '-'}`}
            />

            <TitleSubtitle
              title="Patient ID"
              subtitle={`${data?.patientFacilityCode || '-'}`}
            />

            <TitleSubtitle
              title="Phone Number"
              subtitle={`${data?.patientPhone || '-'}`}
            />

            <TitleSubtitle
              title="Email"
              subtitle={`${data?.patientEmail || '-'}`}
            />

            <TitleSubtitle
              title="Gender"
              subtitle={`${GenderMapping[`${data?.patientGenderId}`] || '-'}`}
            />

            <TitleSubtitle
              title="Date of Birth"
              subtitle={`${formatDate(data?.dateOfBirth) || '-'}`}
            />

            <TitleSubtitle
              title="Age"
              subtitle={`${data?.patientAge || '-'}`}
            />

            <TitleSubtitle
              title="Marital Status"
              subtitle={data?.maritalStatusId || `-`}
            />

            <TitleSubtitle
              title="Address"
              subtitle={`${data?.address || '-'}`}
              className="2xl:col-span-4"
            />

            <TitleSubtitle
              title="Emergency contact Name"
              subtitle={`${data?.emergencyContactFirstname || '-'} ${
                data?.emergencyContactLastName || '-'
              }`}
            />

            <TitleSubtitle
              title="Contact Number"
              subtitle={`${data?.emergencyContactNumber || '-'}`}
            />

            <TitleSubtitle
              title="Relationship"
              subtitle={`${data?.emergencyContactRelationship || '-'}`}
            />

            <TitleSubtitle
              title="Reason for Registration"
              subtitle={`${data?.reasonForRegistration || '-'}`}
            />

            <TitleSubtitle
              title="Taken Drugs"
              subtitle={`${data?.takingMedication ? 'Yes' : 'No' || '-'}`}
            />

            <TitleSubtitle
              title="Address Information"
              subtitle={`${data?.address || '-'}`}
              className="col-span-6"
            />
          </div>

          <Table
            loading={patientReportLoading}
            data={patientReport?.resultItem || []}
            columns={columns}
            tableHeading="All Report"
          />
        </div>
      </section>
    </>
  );
};
export default ViewPatient;

const TitleSubtitle = ({
  title,
  subtitle,
  className = '',
}: {
  title: string;
  subtitle: string | number;
  className?: string;
}) => {
  return (
    <div className={className}>
      <p className="text-base font-medium">{title}</p>
      <p className="text-greyText2 whitespace-pre-wrap">{subtitle || '-'}</p>
    </div>
  );
};
