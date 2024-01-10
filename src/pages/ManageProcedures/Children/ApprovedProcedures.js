import { TablePagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../data/data";
import SearchIcon from "../../../Assets/IconAndLogo/searchInputIcon.png";
import ExportIcon from "../../../Assets/IconAndLogo/ExportIcon.png";
import { DashboardTabs } from "../../../components/DashboardTabs";

export const ApprovedProcedures = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchList();
  }, [currentPage, pageSize]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setCurrentPage(0);
    setPageSize(parseInt(event.target.value, 10));
  };

  const fetchList = () => {
    const url = `${BASE_URL}/service-manager/procedures/getAllPaged`;
    axios
      .get(url, {
        params: {
          currentPage: currentPage + 1,
          startIndex: currentPage * pageSize + 1,
          pageSize,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          //   setData(res.data?.data?.resultItem ?? []);
          setTotal(res.data?.data?.totalCount ?? 0);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="tw-p-[16px] tw-bg-[white] tw-mt-[20px] tw-rounded-[20px]">
        <h4 className="ce-heading-2">Available Procedure</h4>

        <div className="tw-grid tw-mt-[28px] tw-gap-[20px] tw-grid-cols-[1fr_1fr] lg:tw-flex tw-items-center lg:tw-justify-between">
          <div className="tw-col-span-2 lg:tw-col-span-[unset] lg:tw-w-[50%] search-input-container">
            <input placeholder="Search for Services" />
            <img src={SearchIcon} />
          </div>

          <div>All Category</div>

          <button className="export-btn">
            <img src={ExportIcon} alt="" />
            <span>Export</span>
          </button>
        </div>

        <DashboardTabs
          itemsList={[
            { name: "All Procedures", route: "/procedure-management" },
            {
              name: "Pending Procedures",
              route: "/procedure-management/pending",
            },
            {
              name: "Approved Procedures",
              route: "/procedure-management/approved",
            },
          ]}
        />

        <div className="ce-table-holder">
          <h5 className="table-heading">Discount - 4</h5>

          <table>
            <thead>
              <tr>
                <th>Date Created</th>
                <th>Procedure Category</th>
                <th>Procedure Type</th>
                <th>Procedure Price</th>
                <th>Procedure Rebate</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* <tr>
                <td>Today</td>
                <td>Red Blood Cell</td>
                <td>Cholesterol</td>
                <td>NGN 5,000.00</td>
                <td>5%</td>
                <td>Pending</td>
              </tr> */}
            </tbody>
          </table>

          <TablePagination
            component="div"
            count={total}
            page={currentPage}
            labelRowsPerPage="Items per page"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPage={pageSize}
          />
        </div>
      </div>
    </>
  );
};
