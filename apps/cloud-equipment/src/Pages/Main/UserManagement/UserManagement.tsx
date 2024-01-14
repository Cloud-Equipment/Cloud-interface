import React, { useState } from 'react';
import {
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  TablePagination,
} from '@mui/material';
import { InviteUserModal } from './InviteUserModal';
import * as Assets from '@cloud-equipment/assets';

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const handleChangePage = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setCurrentPage(0);
    setPageSize(parseInt(event.target.value, 10));
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [inviteUserModalOpen, setInviteUserModalOpen] = React.useState(false);
  const openInviteUserModal = () => setInviteUserModalOpen(true);
  const closeInviteUserModal = () => setInviteUserModalOpen(false);

  return (
    <>
      <Modal open={inviteUserModalOpen} onClose={closeInviteUserModal}>
        <div>
          <InviteUserModal onClose={closeInviteUserModal} />
        </div>
      </Modal>

      <section className="ce-px ce-py">
        <div className="flex justify-end gap-4 flex-wrap mt-5">
          <button onClick={openInviteUserModal} className="ce-btn">
            Invite User
          </button>
          <button className="ce-btn-outline">Manage Roles</button>
          <button className="ce-btn-text">Enforce 2FA</button>
        </div>

        <div className="p-[16px] bg-[white] mt-[20px] rounded-[20px]">
          <h4 className="ce-heading-2">Users</h4>

          <div className="grid mt-6 gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
            <div className="col-span-2 lg:col-span-[unset] lg:w-[50%] search-input-container">
              <input placeholder="Search for Patient Name" />
              <img src={Assets.Icons.Search} />
            </div>

            <div className="sort-container">
              <span className="sort-text">Sort by:</span>

              <span className="sort-value">Newest to Oldest</span>

              <img src={Assets.Icons.SolidArrowDown} alt="" />
            </div>

            <button className="export-btn">
              <img src={Assets.Icons.ExportIcon} alt="" />
              <span>Export</span>
            </button>
          </div>

          <div className="mt-10 ce-table-holder">
            <h5 className="table-heading">Team members- 5</h5>

            <table>
              <thead>
                <tr>
                  <th>Date & Time Added</th>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th>2FA Status</th>
                  <th>Last Login</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {[1, 2, 3].map((item, index) => (
                  <tr key={index}>
                    <td>{'01-12-2023'}</td>
                    <td>{'Emmanuel Abdullah'}</td>
                    <td>{'emmanuel@cloud.io'}</td>
                    <td>{'Receptionist'}</td>
                    <td>{'Enabled'}</td>
                    <td>{'Sep 26, 2023, 12:41 PM'}</td>
                    <td>
                      <div>
                        <button
                          //   id="basic-button"
                          onClick={handleClick}
                          className="w-6"
                        >
                          <img src={Assets.Icons.Menudots} alt="" />
                        </button>
                        <Menu
                          //   id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem onClick={handleClose}>
                            <ListItemText>Disable User</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemText>Enable 2FA</ListItemText>
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
      </section>
    </>
  );
};

export default UserManagement;
