import React from 'react'
import LayoutWithSidebar from '../../components/LayoutWithSidebar'
import Navbar from '../../components/Navbar'
import Banner from '../ActiveForm/Banner'

function ReportUploader() {
  return (
    <div>
        <LayoutWithSidebar>
            <div className="ReportUploader">
                <Navbar />
                <div className="Navmargin"></div>
                <Banner />
            </div>
        </LayoutWithSidebar>
    </div>
  )
}

export default ReportUploader