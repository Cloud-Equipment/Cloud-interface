import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Banner from './Banner'
import { calculateHeight } from '../../utils/utils'
import Partners from '../../components/Partners'
import Form from './Form'
// import Chat from '../../Assets/IconAndLogo/CHAT.png'

function ActiveForms() {
  const number = 95
  let height = calculateHeight(number)

  return (
    <div>
      <div className="ActiveForm">
        {/* <img src={Chat} alt="" className='chat' /> */}
        <div className="">
          <Sidebar />
        </div>
        <div className="All">
          <Navbar />
          <div className="Overflow">
            <Banner />
            <div className="ActiveOutline">
              <div className="container">
                <Form />
              </div>
            </div>
            <Partners />
              <Footer />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ActiveForms