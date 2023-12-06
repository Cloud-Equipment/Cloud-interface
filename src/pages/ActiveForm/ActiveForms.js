import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Banner from './Banner'

import Partners from '../../components/Partners'
import Form from './Form'
import LayoutWithSidebar from '../../components/LayoutWithSidebar'
// import Chat from '../../Assets/IconAndLogo/CHAT.png'

function ActiveForms() {
  return (
    <div>
      <LayoutWithSidebar>
        <Navbar />
        <div className="OverflowSection">
          <Banner />
          <div className="ActiveOutline">
            <div className="container">
              <Form />
            </div>
          </div>
          <Partners />
          <Footer />
        </div>
      </LayoutWithSidebar>
    </div>
  )
}

export default ActiveForms