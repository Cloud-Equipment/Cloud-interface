import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Banner from './Banner'
import { calculateHeight } from '../../utils/utils'
import Partners from '../../components/Partners'

function ActiveForms() {
  const number = 95
  let height = calculateHeight(number)

  return (
    <div>
      <div className="ActiveForm">
        <div className="">
          <Sidebar />
        </div>
        <div className="">
          <Navbar />
          <div className="Overflow" style={{ height: height }}>
            <Banner />
          
          </div>
        </div>
      </div>
      <Partners />
            <Footer />
    </div>
  )
}

export default ActiveForms