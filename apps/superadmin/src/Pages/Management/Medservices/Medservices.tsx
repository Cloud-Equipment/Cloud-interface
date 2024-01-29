import React, { useState } from 'react';
import { Button, NavTab } from '@cloud-equipment/ui-components';
import { MedserviceRouting } from './MedserviceRouting';
import { useLocation } from 'react-router-dom';
import { Modal } from '@mui/material';
import CategoryModal from './modals/CategoryModal';
import MedserviceModal from './modals/MedserviceModal';

const Medservices = () => {
  const location = useLocation();

  //   modal
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [medserviceModalOpen, setMedserviceModalOpen] = useState(false);

  //   modal
  const openCategoryModal = () => {
    setCategoryModalOpen(true);
  };
  const openMedserviceModal = () => {
    setMedserviceModalOpen(true);
  };

  const closeCategoryModal = () => setCategoryModalOpen(false);
  const closeMedserviceModal = () => setMedserviceModalOpen(false);

  return (
    <>
      <Modal open={categoryModalOpen} onClose={closeCategoryModal}>
        <div>{<CategoryModal onClose={closeCategoryModal} />}</div>
      </Modal>

      <Modal open={medserviceModalOpen} onClose={closeMedserviceModal}>
        <div>{<MedserviceModal onClose={closeMedserviceModal} />}</div>
      </Modal>

      <section className="ce-px ce-py">
        <div className="flex justify-between items-end">
          <NavTab
            links={[
              { label: 'Medical Services', href: '/management/medservices' },
              {
                label: 'Medical Categories',
                href: '/management/medservices/categories',
              },
              {
                label: 'Price Change Request',
                href: '/management/medservices/price-change-request',
              },
            ]}
            wrapperClass="mt-6"
          />

          {location.pathname.endsWith('/categories') ? (
            <button onClick={openCategoryModal} className="ce-btn ">
              New Category
            </button>
          ) : (
            <button onClick={openMedserviceModal} className="ce-btn ">
              New Price/Test
            </button>
          )}
        </div>

        <div className="mt-10">
          <MedserviceRouting />
        </div>
      </section>
    </>
  );
};

export default Medservices;
