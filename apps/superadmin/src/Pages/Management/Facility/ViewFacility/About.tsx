import { useParams } from 'react-router-dom';

import queries from '../../../../services/queries/manageFacility';
import { formatDate } from '../../../../utils';

const About = () => {
  const { id } = useParams();

  const { useGetOneFacility } = queries;
  const { data } = useGetOneFacility(
    `/facility-manager/facility/getfacility/${id}`,
    {},
    id
  );

  return (
    <div className="bg-white px-3.5 py-5 rounded-[20px]">
      <div className="flex flex-col gap-5">
        <div className="">
          <h4 className="text-primary-150 font-playfair text-lg font-bold leading-[1.75rem] mb-1">
            Facility Information
          </h4>
          <p className="font-dmsans text-sm font-normal leading-[1.25rem]">
            You are to populate the Rebate Amount to efficiency calculate a
            deduction
          </p>
        </div>
        <TitleSubField
          title="Facility Name"
          subtitle={`${data?.facilityName || '-'}`}
        />
        <TitleSubField
          title="Address"
          subtitle={`${data?.addressLine1 || '-'}`}
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <TitleSubField
            title="Registration Date & Time"
            subtitle={formatDate(data?.dateCreated)}
          />
          <TitleSubField
            title="Facility ID"
            subtitle={`${data?.facilityCECode || '-'}`}
          />
          <TitleSubField
            title="Phone Number of Facility"
            subtitle={data?.phone || '-'}
          />
          <TitleSubField
            title="Email of facility"
            subtitle={data?.email || '-'}
          />

          <TitleSubField
            title="Facility Type"
            subtitle={data?.facilityTypeId || '-'}
          />
          <TitleSubField
            title="Rebate Percentage"
            subtitle={data?.rebatePercent || '-'}
          />
          <TitleSubField
            title="Number of User"
            subtitle={data?.numberOfUsers || '-'}
          />
          <TitleSubField
            title="Phone Number of admin"
            subtitle={data?.adminPhoneNumber || '-'}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <TitleSubField
          title="Admin Information"
          subtitle="You are to populate the Rebate Amount to efficiency calculate a deduction"
          variant={'2'}
        />
        <div className="flex md:gap-10">
          <TitleSubField
            title="Admin Email Address"
            subtitle="johnsmith@gmail.com"
          />
          <TitleSubField title="Admin Role" subtitle="Chief Medical Director" />
        </div>
        <TitleSubField title="Comment" subtitle="No Comment attached" />
        <div className="">
          <TitleSubField
            title="Document Upload"
            subtitle="You are to populate the Rebate Amount to efficiency calculate a deduction"
            variant="2"
          />
          <hr className="my-2" />
          <div className="flex gap-2 mt-6">
            <MediaCard />
            <MediaCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

// TODO: Move to their own components
const TitleSubField = ({
  title,
  subtitle,
  variant = '1',
}: {
  title: string;
  subtitle: string | number;
  variant?: '1' | '2';
}) => {
  const variants = {
    '1': 'text-neutral-350',
    '2': 'text-primary-150 font-playfair',
  };
  return (
    <div className="flex flex-col gap-1 ">
      <h5
        className={`text-lg font-bold leading-[25px] font-nunito ${variants[variant]} `}
      >
        {title}
      </h5>
      <p className="text-base font-normal leading-[22px] text-neutral-400 font-nunito">
        {subtitle}
      </p>
    </div>
  );
};

const MediaCard = () => {
  return (
    <div className="border border-secondary-450 rounded h-[230px] flex flex-col w-full shadow-facilityMediaCard">
      <div className="border-b flex-[3]"></div>
      <div className="flex-1 px-3.5 py-5 flex justify-between">
        <div className="flex flex-col gap-1">
          <h5 className="text-secondary-100 font-dmsans text-lg font-bold leading-[1.4375rem]">
            Company Business Registration
          </h5>
          <p className="font-dmsans text-base leading-[1.25rem] text-neutral-450">
            PNG - 361×164
          </p>
        </div>
        <span className="text-[0.6875rem] font-bold bg-secondary-450 py-0.5 px-1 text-neutral-500 h-fit">
          FILE
        </span>
      </div>
    </div>
  );
};
