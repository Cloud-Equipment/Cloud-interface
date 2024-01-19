import { useParams } from 'react-router-dom';

import * as Assets from '@cloud-equipment/assets';
import { Button, NavTab } from '@cloud-equipment/ui-components';
import { copyToClipboard } from '../../../utils';

const ViewFacility = () => {
  const { id } = useParams();
  return (
    <div className="flex min-h-screen w-[90%] mx-auto gap-6 pt-6 bg-primary-200 font-manrope">
      <div className="flex-[3] bg-white rounded-[20px] min-h-[450px] px-3.5 py-5 flex flex-col">
        <div className="flex gap-4">
          <div className="rounded-full w-14 h-14 border"></div>
          <div className="">
            <h5 className=" font-medium text-2xl leading-[2.0625rem]">
              Agape Laboratory
            </h5>
            <p className="text-sm font-normal leading-[1.1875rem] text-neutral-150">
              Added on Oct 23, 2023
            </p>
          </div>
          <div className="font-dmsans text-neutral-200 text-sm font-normal leading-[1.125rem]">
            5.0
          </div>
        </div>
        <div className="my-10">
          <div className="rounded-full w-16 h-16 border"></div>
          <h5 className="text-2xl font-medium leading-[2.0625rem] text-secondary-350">
            Emmanuel Abubakar
          </h5>
          <p className="text-neutral-150 text-sm font-normal leading-[1.1875rem]">
            Chief Medical Doctor
          </p>
        </div>
        <div className="[&>div]:text-sm [&>div]:font-normal [&>div]:leading-[1.1875rem] [&>div]:text-secondary-400 [&>div]:border-b [&>div]:border-secondary-200 [&>div]:mb-5 [&>div]:pb-4">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <img alt="" src={Assets.Icons.UserIcon} className="" /> CE/001{' '}
            </div>
            <img
              src={Assets.Icons.CopyIcon}
              className="cursor-pointer"
              onClick={() => copyToClipboard('CE/001')}
              alt=""
            />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <img alt="" src={Assets.Icons.MailIcon} className="" />{' '}
              devendrac11@gmail.com{' '}
            </div>
            <img
              src={Assets.Icons.CopyIcon}
              className="cursor-pointer"
              alt=""
              onClick={() => copyToClipboard('devendrac11@gmail.com')}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <img alt="" src={Assets.Icons.PhoneIcon} /> 234(0)812345667{' '}
            </div>
            <img
              src={Assets.Icons.CopyIcon}
              className="cursor-pointer"
              alt=""
              onClick={() => copyToClipboard('234(0)812345667')}
            />
          </div>
          <div className="flex">No 4, Karu L.G.A., Nasarawa State</div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <img alt="" src={Assets.Icons.WarningIcon} /> Blacklist Facility
            </div>
          </div>
        </div>
        <div className="flex">
          <Button
            className="bg-primary-250 !text-primary-150"
            icon={Assets.Icons.EditIcon}
            label="Edit"
          />
        </div>
      </div>
      <div className="flex-[7] min-h-[450px] flex flex-col gap-5">
        <div className="bg-white px-3.5 py-5 rounded-[20px]">
          <h5 className="mb-3 font-dmsans text-lg font-medium leading-[1.75rem] text-secondary-300">
            Facility Details
          </h5>
          <NavTab
            links={[
              {
                label: 'About',
                href: `/management/facility/viewFacility/${id}/about`,
              },
              {
                label: 'Report',
                href: `/management/facility/viewFacility/${id}/report`,
              },
              {
                label: 'Staffs',
                href: `/management/facility/viewFacility/${id}/staffs`,
              },
              {
                label: 'Payment',
                href: `/management/facility/viewFacility/${id}/payment`,
              },
              {
                label: 'Equipments',
                href: `/management/facility/viewFacility/${id}/equipment`,
              },
              {
                label: 'Tickets',
                href: `/management/facility/viewFacility/${id}/tickets`,
              },
              {
                label: 'Reviews',
                href: `/management/facility/viewFacility/${id}/reviews`,
              },
            ]}
            wrapperClass="mt-6"
          />
        </div>

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
            <TitleSubField title="Facility Name" subtitle="Agape Laboratory" />
            <TitleSubField
              title="Address"
              subtitle="No 4, Karu L.G.A., Nasarawa State"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <TitleSubField
                title="Registration Date & Time"
                subtitle="15th January, 2024. 15:03am"
              />
              <TitleSubField title="Facility ID" subtitle="CE/FE/001" />
              <TitleSubField
                title="Phone Number of Facility"
                subtitle="+234 70 34522211"
              />
              <TitleSubField
                title="Email of facility"
                subtitle="johnsmith@gmail.com"
              />

              <TitleSubField title="Facility Type" subtitle="Laboratory" />
              <TitleSubField title="Rebate Percentage" subtitle="5%" />
              <TitleSubField title="Number of User" subtitle="5" />
              <TitleSubField
                title="Phone Number of admin"
                subtitle="+234 70 34522211"
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
              <TitleSubField
                title="Admin Role"
                subtitle="Chief Medical Director"
              />
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
      </div>
    </div>
  );
};

export default ViewFacility;

// TODO: Move to their own components
const TitleSubField = ({
  title,
  subtitle,
  variant = '1',
}: {
  title: string;
  subtitle: string;
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
