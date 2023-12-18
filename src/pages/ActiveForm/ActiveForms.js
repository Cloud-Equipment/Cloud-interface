import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Banner from './Banner'

import Partners from '../../components/Partners'
import Form from './Form'
import LayoutWithSidebar from '../../components/LayoutWithSidebar'
import RequestCard from '../../components/RequestCard'
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
              <div className="margin50"></div>
              <center>
                <RequestCard />
              </center>
              <div className="margin40"></div>
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