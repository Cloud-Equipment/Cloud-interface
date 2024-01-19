import { useParams } from 'react-router-dom';
import { Button, NavTab } from '@cloud-equipment/ui-components';

const ViewFacility = () => {
  const { id } = useParams();
  return (
    <div className="flex min-h-screen w-[90%] mx-auto gap-6 pt-6 bg-primary-200">
      <div className="flex-[2] bg-white rounded-[20px] min-h-[450px] px-3.5 py-5 flex flex-col">
        <div className="">
          <div className="">Logo</div>
          <div className="">
            <h5 className="">Agape Laboratory</h5>
            <p className="">Added on Oct 23, 2023</p>
          </div>
          <div className="">5.0</div>
        </div>
        <div className="">
          Logo
          <h5 className="">Emmanuel Abubakar</h5>
          <p className="">Chief Medical Doctor</p>
        </div>
        <div className="">
          <div className="">CE/001</div>
          <div className="">devendrac11@gmail.com</div>
          <div className="">234(0)812345667</div>
          <div className="">No 4, Karu L.G.A., Nasarawa State</div>
          <div className="">Blacklist Facility</div>
        </div>
        <div className="">
          <Button icon="" label="Edit" />
        </div>
      </div>
      <div className="flex-[5] bg-white rounded-[20px] min-h-[450px] px-3.5 py-5">
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

        <div className="">Tickets</div>
      </div>
    </div>
  );
};

export default ViewFacility;
