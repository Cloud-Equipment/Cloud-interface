import React from 'react'
import LayoutWithSidebar from '../../components/LayoutWithSidebar'
import Navbar from '../../components/Navbar'
import NewReport from '../../components/NewReport'
import NameHeader from '../../components/NameHeader'
import Banner from './Banner'
import AppointmentTable from './AppointmentTable'

function Dasboard() {
    return (
        <div>
            <div className="Dashboard">
                <LayoutWithSidebar >
                    <div className="ManageUser">
                        <Navbar
                            header="Manage User"
                        />
                        <div className="Navmargin"></div>
                        <div className="paddingres">
                            <div className="flexDivSpace">
                                <div className=""><NameHeader
                                    name=" Emma Taylor"
                                    details="Check your activities in this dashboard."
                                /></div>
                                <div className="">
                                     <NewReport
                                     Type="New"
                                 />
                                 </div>
                            </div>
                            <Banner />
                            <AppointmentTable />
                        </div>
                    </div>
                </LayoutWithSidebar >
            </div>
        </div>
    )
}

export default Dasboard