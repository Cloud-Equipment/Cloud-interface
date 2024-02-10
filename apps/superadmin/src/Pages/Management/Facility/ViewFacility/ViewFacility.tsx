import { Suspense } from 'react';

import { useParams } from 'react-router-dom';
import { Switch } from '@mui/material';

import { Button, NavTab } from '@cloud-equipment/ui-components';
import * as Assets from '@cloud-equipment/assets';
import { copyToClipboard, formatDate } from '../../../../utils';
import { ViewFacilityRouting } from './ViewFacilityRouting';
import queries from '../../../../services/queries/manageFacility';

const ViewFacility = () => {
  const { id } = useParams();

  const { useGetOneFacility } = queries;
  const { isLoading, data } = useGetOneFacility(
    `/facility-manager/facility/getfacility/${id}`,
    {},
    id
  );
  console.log('data', data);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="flex min-h-screen w-[95%] mx-auto gap-6 pt-6 bg-primary-200 font-manrope">
      <div className="w-[27%] bg-white rounded-[20px] min-h-[450px] px-3.5 py-5 flex flex-col">
        <div className="flex gap-4">
          <div className="rounded-full w-14 h-14 border"></div>
          <div className="">
            <h5 className=" font-medium text-2xl leading-[2.0625rem]">
              {data?.facilityName || '-'}
            </h5>
            <p className="text-sm font-normal leading-[1.1875rem] text-neutral-150">
              Added on {formatDate(data?.dateCreated, false)}
            </p>
          </div>
          <div className="font-dmsans text-neutral-200 text-sm font-normal leading-[1.125rem]">
            5.0
          </div>
        </div>
        <div className="my-10">
          <div className="rounded-full w-16 h-16 border"></div>
          <h5 className="text-2xl font-medium leading-[2.0625rem] text-secondary-350">
            {data?.adminFirstname} {data?.adminLastname}
          </h5>
          <p className="text-neutral-150 text-sm font-normal leading-[1.1875rem]">
            Chief Medical Doctor
          </p>
        </div>
        <div className="[&>div]:text-sm [&>div]:font-normal [&>div]:leading-[1.1875rem] [&>div]:text-secondary-400 [&>div]:border-b [&>div]:border-secondary-200 [&>div]:mb-5 [&>div]:pb-4">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <img alt="" src={Assets.Icons.UserIcon} className="" />{' '}
              {data?.facilityCECode || '-'}{' '}
            </div>
            <img
              src={Assets.Icons.CopyIcon}
              className="cursor-pointer"
              onClick={() => copyToClipboard(data?.facilityCECode || '')}
              alt=""
            />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <img alt="" src={Assets.Icons.MailIcon} className="" />{' '}
              {data?.facilityEmail}{' '}
            </div>
            <img
              src={Assets.Icons.CopyIcon}
              className="cursor-pointer"
              alt=""
              onClick={() => copyToClipboard(data?.facilityEmail)}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <img alt="" src={Assets.Icons.PhoneIcon} /> {data?.facilityPhone}{' '}
            </div>
            <img
              src={Assets.Icons.CopyIcon}
              className="cursor-pointer"
              alt=""
              onClick={() => copyToClipboard(data?.facilityPhone)}
            />
          </div>
          <div className="flex">{data?.addressLine1}</div>
          <div className="flex">
            <div className="flex gap-4 flex-1">
              <img alt="" src={Assets.Icons.WarningIcon} /> Blacklist Facility{' '}
            </div>
            <Switch size="small" />
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

        {/*TODO: Add appropriate loader  */}
        <Suspense fallback={<h3>Loading SubPages</h3>}>
          <ViewFacilityRouting />
        </Suspense>
      </div>
    </div>
  );
};

export default ViewFacility;
