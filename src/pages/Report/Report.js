import React from 'react'
import LayoutWithSidebar from '../../components/LayoutWithSidebar'
import NavbarTwo from '../../components/NavbarTwo'

function Report() {
    return (
        <div>
            <div className="Report">
                <LayoutWithSidebar >
                    <div className="Report">
                        <NavbarTwo
                            header="Report"
                        />
                    </div>
                </LayoutWithSidebar>
            </div>
        </div>
    )
}

export default Report