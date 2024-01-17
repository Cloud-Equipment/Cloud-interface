import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  TablePagination,
} from '@mui/material';
import moment from 'moment';
import numeral from 'numeral';

import { IMedservice } from 'Models/procedures.models';
import { _getPrices } from '../../../services/price.service';
import * as Assets from '@cloud-equipment/assets';
import { NavTab, Button } from '@cloud-equipment/ui-components';
import { Routes } from '../../../routes';

const ManageFacility = () => {
  const navigate = useNavigate();
  // table
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [pricesList, setPricesList] = useState<IMedservice[] | null>(null);

  //   menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  //   modal
  const [inviteUserModalOpen, setInviteUserModalOpen] = React.useState(false);

  //   table
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setCurrentPage(0);
    setPageSize(parseInt(event.target.value, 10));
  };

  const getPrices = () => {
    _getPrices(currentPage, 0, pageSize)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setPricesList(res.data.data);
        }
      })
      .catch((err) => {});
  };

  //   menu
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //   modal
  const openInviteUserModal = () => setInviteUserModalOpen(true);
  const closeInviteUserModal = () => setInviteUserModalOpen(false);

  useEffect(() => {
    getPrices();
  }, [pageSize, currentPage]);

  //   tabs

  return (
    <>
      <Modal open={inviteUserModalOpen} onClose={closeInviteUserModal}>
        <div>{/* <InviteUserModal onClose={closeInviteUserModal} /> */}</div>
      </Modal>

      <section className="ce-px ce-py">
        <div className="p-[16px] mt-[20px] rounded-[20px]">
          <h4 className="ce-heading-2">Management &gt; Facilites </h4>

          <div className="grid mt-6 gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
            <div className="col-span-2 lg:col-span-[unset] lg:w-[30%] search-input-container">
              <input placeholder="Enter Email Address/Customer ID" />
              <img src={Assets.Icons.Search} alt="Search Icon" />
            </div>

            <div className="sort-container">
              <span className="sort-text">Users From:</span>

              <span className="sort-value">Facilities</span>

              <img src={Assets.Icons.SolidArrowDown} alt="" />
            </div>
            <div className="sort-container">
              <span className="sort-text">Date:</span>

              <span className="sort-value">This Month</span>

              <img src={Assets.Icons.SolidArrowDown} alt="" />
            </div>

            <button className="filter-btn">
              <img src={Assets.Icons.ExportIcon} alt="" />
              <span>Filters</span>
            </button>
            {/* <Button label="Add Facilities" /> */}
            <button
              onClick={() => navigate(Routes.management.addFacility)}
              className="ce-btn"
            >
              Add Facilities
            </button>
          </div>

          <div className="px-8 py-3 rounded-[20px] mt-10  bg-white">
            <div className=" ce-table-holder">
              <h5 className="table-heading">Facilities - 5</h5>

              <table>
                <thead>
                  <tr className="bg-secondary-150 w-full">
                    <th>Facility ID</th>
                    <th>Facility Name</th>
                    <th>Email</th>
                    <th>Facility Address</th>
                    <th>Phone Number</th>
                    <th>Last Login</th>
                    {/* take this out */}
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {pricesList?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {moment(item.dateCreated).format(
                          'DD-MM-YYYY . HH:mm:ss'
                        )}
                      </td>
                      <td>{item.medServiceName}</td>
                      <td>{item.medServiceCategoryId}</td>
                      <td>₦{numeral(item.price).format('0,0.00')}</td>
                      <td>{'Enabled'}</td>
                      <td>{'Enabled'}</td>
                      <td>
                        <div>
                          <button onClick={handleActionClick} className="w-6">
                            <img src={Assets.Icons.Menudots} alt="" />
                          </button>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            <MenuItem onClick={handleMenuClose}>
                              <ListItemIcon></ListItemIcon>
                              <ListItemText>
                                View Facility Activities
                              </ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                              <ListItemIcon></ListItemIcon>
                              <ListItemText>Enable User</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                              <ListItemIcon></ListItemIcon>
                              <ListItemText>Disable User</ListItemText>
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
        </div>
      </section>
    </>
  );
};

export default ManageFacility;
