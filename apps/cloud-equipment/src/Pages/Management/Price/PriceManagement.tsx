import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  TablePagination,
} from '@mui/material';
import { IMedservice } from '@cloud-equipment/models';
import { _getPrices } from '../../../services/procedures.service';
import React, { useEffect, useState } from 'react';
import * as Assets from '@cloud-equipment/assets';
import moment from 'moment';
import numeral from 'numeral';
import { NavTab } from '@cloud-equipment/ui-components';
import NewProcedureModal from './NewProcedureModal';
import DeleteProdecureModal from './DeleteProdecureModal';
import ApprovePriceModal from './ApprovePriceModal';

const PriceManagement = () => {
  // table
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [pricesList, setPricesList] = useState<IMedservice[] | null>(null);

  //   menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedProcedure, setSelectedProcedure] =
    useState<null | IMedservice>(null);

  //   modals
  const [priceModalOpen, setPriceMOdalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteMOdalOpen] = React.useState(false);
  const [approveModalOpen, setApproveMOdalOpen] = React.useState(false);

  //   table
  const handleChangePage = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setCurrentPage(0);
    setPageSize(parseInt(event.target.value, 10));
  };

  const getPrices = () => {
    _getPrices(currentPage, 0, pageSize)
      .then((res) => {
        if (res.data.success) {
          setPricesList(res.data.data);
        }
      })
      .catch((err) => {});
  };

  //   menu
  const handleActionClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    x: IMedservice
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProcedure(x);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleMenuClose();
    if (false) {
      setPriceMOdalOpen(true);
    } else {
      setApproveMOdalOpen(true);
    }
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteMOdalOpen(true);
  };
  const handleApproveClick = () => {
    handleMenuClose();
    setApproveMOdalOpen(true);
  };

  //   modals
  const openPriceModal = () => {
    setSelectedProcedure(null);
    setPriceMOdalOpen(true);
  };

  const closePriceModal = () => setPriceMOdalOpen(false);
  const closeDeleteModal = () => setDeleteMOdalOpen(false);
  const closeApproveModal = () => setApproveMOdalOpen(false);

  useEffect(() => {
    getPrices();
  }, [pageSize, currentPage]);
  //   tabs

  return (
    <>
      <Modal open={priceModalOpen} onClose={closePriceModal}>
        <div>
          {
            <NewProcedureModal
              procedureToEdit={selectedProcedure}
              onClose={closePriceModal}
            />
          }
        </div>
      </Modal>
      <Modal open={deleteModalOpen} onClose={closeDeleteModal}>
        <div>
          {
            <DeleteProdecureModal
              procedureToEdit={selectedProcedure!}
              onClose={closeDeleteModal}
            />
          }
        </div>
      </Modal>
      <Modal open={approveModalOpen}>
        <div>
          {
            <ApprovePriceModal
              procedureData={selectedProcedure!}
              onClose={closeApproveModal}
            />
          }
        </div>
      </Modal>

      <section className="ce-px ce-py">
        <div className="flex justify-end gap-4 flex-wrap mt-5">
          {priceModalOpen}
          <button onClick={openPriceModal} className="ce-btn">
            New Price/ Test
          </button>
        </div>

        <div className="p-[16px] bg-[white] mt-[20px] rounded-[20px]">
          <div className="grid  gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
            <div className="col-span-2 lg:col-span-[unset] lg:w-[50%] search-input-container">
              <input placeholder="Search for Patient Name" />
              <img src={Assets.Icons.Search} alt="Search Icon" />
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

          <NavTab
            links={[
              { label: 'All Prices', href: '/management/medservices' },
              { label: 'Approved Prices', href: '.' },
              { label: 'Pending Prices', href: '.' },
            ]}
            wrapperClass="mt-6"
          />

          <div className="mt-10 ce-table-holder">
            <h5 className="table-heading">Team members- 5</h5>

            <table>
              <thead>
                <tr>
                  <th>Date & Time Added</th>
                  <th>Procedure Name</th>
                  <th>Procedure Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {pricesList?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {moment(item.dateCreated).format('DD-MM-YYYY . HH:mm:ss')}
                    </td>
                    <td>{item.medServiceName}</td>
                    <td>{item.medServiceCategoryId}</td>
                    <td>₦{numeral(item.price).format('0,0.00')}</td>
                    <td>{'Enabled'}</td>
                    <td>
                      <div>
                        <button
                          onClick={(e) => handleActionClick(e, item)}
                          className="w-6"
                        >
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
                          <MenuItem onClick={handleEditClick}>
                            <ListItemIcon>
                              <img src={Assets.Icons.EditPrice} alt="" />
                            </ListItemIcon>
                            <ListItemText>Edit Price</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleDeleteClick}>
                            <ListItemIcon>
                              <img src={Assets.Icons.Delete} alt="" />
                            </ListItemIcon>
                            <ListItemText>Delete Procedure</ListItemText>
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

export default PriceManagement;
