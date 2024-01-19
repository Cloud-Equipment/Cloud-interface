import { useParams } from 'react-router-dom';

import { Button, NavTab } from '@cloud-equipment/ui-components';
import { ViewFacilityRouting } from './ViewFacilityRouting';
import * as Assets from '@cloud-equipment/assets';
import { copyToClipboard } from '../../../../utils';

const ViewFacility = () => {
  const { id } = useParams();
  return (
    <div className="flex min-h-screen w-[95%] mx-auto gap-6 pt-6 bg-primary-200 font-manrope">
      <div className="w-[27%] bg-white rounded-[20px] min-h-[450px] px-3.5 py-5 flex flex-col">
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
      <div className="w-[73%] min-h-[450px] flex flex-col gap-5">
        <div className="bg-white px-3.5 py-5 rounded-[20px]">
          <h5 className="mb-3 font-dmsans text-lg font-medium leading-[1.75rem] text-secondary-300">
            Facility Details
          </h5>
          <NavTab
            links={[
              {
                label: 'About',
                href: `/management/facility/view/${id}/about`,
              },
              {
                label: 'Report',
                href: `/management/facility/view/${id}/report`,
              },
              {
                label: 'Staffs',
                href: `/management/facility/view/${id}/staffs`,
              },
              {
                label: 'Payment',
                href: `/management/facility/view/${id}/payment`,
              },
              {
                label: 'Equipments',
                href: `/management/facility/view/${id}/equipment`,
              },
              {
                label: 'Tickets',
                href: `/management/facility/view/${id}/tickets`,
              },
              {
                label: 'Reviews',
                href: `/management/facility/view/${id}/reviews`,
              },
            ]}
            wrapperClass="mt-6"
          />
        </div>

        <ViewFacilityRouting />
      </div>
    </div>
  );
};

export default ViewFacility;
