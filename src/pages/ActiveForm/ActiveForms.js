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
              <div className="margin50"></div>
              <center>
                <div className="bg-white">
                  <div className="Request">
                    <div className="col-md-8">
                      <h2>Request Medical Equipment from us</h2>
                      <p>Does your facility requires new medical equipment at Zero or minimal cost. </p>
                      <button className='mt-2'>Request Equipment</button>
                    </div>
                  </div>
                </div>
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