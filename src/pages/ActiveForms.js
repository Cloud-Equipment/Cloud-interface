import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ActiveForms() {
  return (
    <div>
        <div className="ActiveForm">
            <div className="">
            <Sidebar />
            </div>
            <div className="">
                <Navbar />
                <div className="Overflow">
                    <Footer />
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default ActiveForms