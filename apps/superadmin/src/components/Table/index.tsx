import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

import TableSkeleton from '../TableSkeleton';
import * as Assets from '@cloud-equipment/assets';

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading: boolean;
  tableHeading: string;
  tableHeadingColorClassName?: string;
  emptyTableLabel?: string;
  emptyTableLabelSubtitle?: string;
}

const Table: React.FC<any> = <T extends object>({
  data,
  columns,
  loading = true,
  tableHeading,
  tableHeadingColorClassName = '!bg-ce-lgreen',
  emptyTableLabel = 'No Data Yet',
  emptyTableLabelSubtitle,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  if (loading) {
    return <TableSkeleton />;
  }
  return (
    <div className="mt-10 ce-table-holder">
      <h5 className="table-heading">{tableHeading}</h5>
      <table>
        <thead className={tableHeadingColorClassName}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {data.length > 0 && (
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {data.length === 0 && (
        <tbody className="flex items-center justify-center border py-10 w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <img src={Assets.Icons.NoTableData} alt="" />
            <h5 className="font-dmsans font-medium text-base mt-3">
              {emptyTableLabel}
            </h5>
            {emptyTableLabelSubtitle && <p>{emptyTableLabelSubtitle}</p>}
          </div>
        </tbody>
      )}
    </div>
  );
};

export default Table;
