import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReportsIcon from "../../../assets/icons/report-btn.svg";
import SearchIcon from "../../../assets/icons/search.svg";
import ExportIcon from "../../../assets/icons/export-icon.svg";
import ArrowDown from "../../../assets/icons/solid-arrow-down.svg";
import { ListItemIcon, ListItemText, TablePagination } from "@mui/material";
import { environment } from "../../../environments";
import axios, { AxiosResponse } from "axios";
import { IProcedure } from "../../../Models/procedures.models";
import { ApiResponse } from "../../../Models/api.models";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "../../../assets/icons/menu-dots.svg";
import ViewIcon from "../../../assets/icons/view.svg";
import ShareIcon from "../../../assets/icons/share.svg";
import ConfirmIcon from "../../../assets/icons/confirm.svg";
import UploadIcon from "../../../assets/icons/upload.svg";

const Reports = () => {
  const [data, setData] = useState<IProcedure[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchList();
  }, [currentPage, pageSize]);

  const handleChangePage = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setCurrentPage(0);
    setPageSize(parseInt(event.target.value, 10));
  };

  const fetchList = () => {
    const url = `${environment.baseUrl}/service-manager/procedures/getAllPaged`;
    axios
      .get(url, {
        params: {
          currentPage: currentPage + 1,
          startIndex: currentPage * pageSize + 1,
          pageSize,
        },
      })
      .then((res: AxiosResponse<ApiResponse>) => {
        if (res.data.success === true) {
          setData(res.data?.data?.resultItem ?? []);
          setTotal(res.data?.data?.totalCount ?? 0);
        }
      });
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleViewClick = (x: number) => {
    console.log(x);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dateFormat = (inputDateString: Date) => {
    const inputDate = new Date(inputDateString);

    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = inputDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const [procedureToEdit, setProcedureToEdit] = useState(null);

  return (
    <section className="ce-px ce-py">
      <h4 className="text-ce-green font-bold text-2xl">
        <span className="font-normal">Hello</span> , Emma Taylor
      </h4>

      <p className="text-greyText2 text-sm">
        Stay up to date with your patients' reports.
      </p>

      <div className="flex justify-end mt-5">
        <Link to="/reports/new">
          <button className="ce-btn ce-btn-icon">
            <img src={ReportsIcon} alt="" />
            <span>New Report</span>
          </button>
        </Link>
      </div>

      <>
        <div className="p-[16px] bg-[white] mt-[20px] rounded-[20px]">
          <h4 className="ce-heading-2">All Reports</h4>

          <div className="grid mt-6 gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
            <div className="col-span-2 lg:col-span-[unset] lg:w-[50%] search-input-container">
              <input placeholder="Search for Patient Name" />
              <img src={SearchIcon} />
            </div>

            <div className="sort-container">
              <span className="sort-text">Sort by:</span>

              <span className="sort-value">Newest to Oldest</span>

              <img src={ArrowDown} alt="" />
            </div>

            <button className="export-btn">
              <img src={ExportIcon} alt="" />
              <span>Export</span>
            </button>
          </div>

          <div className="mt-10 ce-table-holder">
            <h5 className="table-heading">All Report</h5>

            <table>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Procedure/Test Ordered</th>
                  <th>Age of Patient</th>
                  <th>Referrer's Name</th>
                  <th>Referrer's Hospital</th>
                  <th>Phone Number</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{dateFormat(item.date)}</td>
                    <td>{item.medServiceName}</td>
                    <td>{item.patientAge}</td>
                    <td>{item.referrerName}</td>
                    <td>{item.refererHospital}</td>
                    <td>{item.phoneNo}</td>
                    <td>NGN {item.amount}</td>
                    <td>
                      <div>
                        <button
                          //   id="basic-button"
                          onClick={handleClick}
                          className="w-6"
                        >
                          <img src={MenuIcon} alt="" />
                        </button>
                        <Menu
                          //   id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            onClick={() =>
                              handleViewClick(item.procedureEntryId)
                            }
                          >
                            <ListItemIcon>
                              <img src={ViewIcon} alt="" />
                            </ListItemIcon>
                            <ListItemText>View Profile</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <img src={ShareIcon} alt="" />
                            </ListItemIcon>
                            <ListItemText>Share Result</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <img src={ConfirmIcon} alt="" />
                            </ListItemIcon>
                            <ListItemText>Confirm Test</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <img src={UploadIcon} alt="" />
                            </ListItemIcon>
                            <ListItemText>Upload Result</ListItemText>
                          </MenuItem>
                        </Menu>
                      </div>
                    </td>
                  </tr>
                ))}
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
    </section>
  );
};

export default Reports;
