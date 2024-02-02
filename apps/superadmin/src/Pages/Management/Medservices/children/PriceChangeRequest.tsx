import { createColumnHelper } from '@tanstack/react-table';
import * as Assets from '@cloud-equipment/assets';
import { Table } from '../../../../components';
import queries from '../../../../services/queries/managePriceHistory';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../../../utils';
import numeral from 'numeral';

type MedserviceTableColumns = {
  changedByUserId: string;
  dateRetired: string;
  medServiceId: string;
  medServiceName: string;
  newPrice: string;
  oldPrice: string;
} & { elipsis: 'elipsis' };

const columnHelper = createColumnHelper<MedserviceTableColumns>();

const columns = (handleActionsView: () => void) => [
  columnHelper.accessor('dateRetired', {
    header: 'Date & Time Added',
    cell: (info) => formatDate(info.getValue()?.toString()),
  }),
  columnHelper.accessor('oldPrice', {
    header: 'Old Price',
    cell: (info) => `₦${numeral(info.getValue()).format('0,0.00')}`,
  }),
  columnHelper.accessor('newPrice', {
    header: 'New Price',
    cell: (info) => `₦${numeral(info.getValue()).format('0,0.00')}`,
  }),
];

const PriceChangeRequest = () => {
  const { id } = useParams();

  const { useGetMedservicePriceHistory } = queries;

  const { isLoading, data } = useGetMedservicePriceHistory(
    `/service-manager/medServices/getmedservicepricehistory?medServiceId=${id}`
  );

  return (
    <>
      {/* <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">{facilityInfo?.facilityName}</h3>
          <p>{facilityInfo?.addressLine1}</p>
        </div>

        <button onClick={openMedserviceModal} className="ce-btn ">
          New Service{' '}
        </button>
      </div> */}

      <div className="p-[16px] bg-[white] mt-[20px] rounded-[20px]">
        <div className="grid  gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
          <div className="col-span-2 lg:col-span-[unset] lg:w-[50%] search-input-container">
            <input placeholder="Enter Email Address/Customer Id" />
            <img src={Assets.Icons.Search} alt="Search Icon" />
          </div>

          <div className="sort-container">
            <span className="sort-text">Sort by:</span>

            <span className="sort-value">Newest to Oldest</span>

            <img src={Assets.Icons.SolidArrowDown} alt="" />
          </div>
        </div>

        <Table
          loading={isLoading}
          data={data || []}
          columns={columns(() => {})}
          tableHeading="Medservices - Prices"
          tableHeadingColorClassName="!bg-secondary-150"
        />
      </div>
    </>
  );
};

export default PriceChangeRequest;
