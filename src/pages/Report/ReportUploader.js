import React, { useRef } from 'react'
import LayoutWithSidebar from '../../components/LayoutWithSidebar'
import Navbar from '../../components/Navbar'
import Banner from '../ActiveForm/Banner'
import Img1 from '../../Assets/IconAndLogo/Group (1).png'
import Csv from '../../Assets/Files/csv.csv'
import Xlsx from '../../Assets/Files/rep.xlsx'
import RequestCard from '../../components/RequestCard'
import Partners from '../../components/Partners'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function ReportUploader() {
  // const [file, setFile] = useState();
  const fileInput = useRef(null)

  const handleClick = () => {
    fileInput.current.click()
}

// function handleChange(e) {
//     console.log(e.target.files);
//     setFile(URL.createObjectURL(e.target.files[0]));
// }

  return (
    <div>
      <LayoutWithSidebar>
        <div className="ReportUploader">
          <Navbar />
          <div className="Navmargin"></div>
          <Banner />
          <center>
            <div className="col-md-9 align-center justify-content">
              <div className="RebortBord paddingres">
                <div className="row">
                  <div className="col-md-6 p-3">
                    <div className="EachCard" onClick={() => handleClick()}>
                      <center>
                        <img src={Img1} alt="" />
                      </center>
                      <div className="text mt-3">
                        <p>Import file from Computer</p>
                        <span>Upload any CSV, XLS, or XLSX files with contact, and Riders information</span>
                      </div>
                      <input
                        type="file"
                        // onChange={handleChange}
                        ref={fileInput}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 p-3">
                    <Link to="/form">
                      <div className="EachCard">
                        <center>
                          <img src={Img1} alt="" />
                        </center>
                        <div className="text mt-3 ">
                          <p>Fill the Online Form</p>
                          <span>You can type in the necessary information as requested from CE</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="Down mt-4">
                  <p>Need help getting started?</p>
                  <span>Download sample spreadsheet template <a href={Csv} download="REPORT TEMPLATE" target='_blank' rel="noreferrer"> CSV </a> - <a href={Xlsx} download="REPORT TEMPLATE" target='_blank' rel="noreferrer"> XLSX </a></span>
                </div>
              </div>
            </div>
          </center>
          <div className="margin50"></div>
          <center>
            <RequestCard />
          </center>
          <div className="margin40"></div>
          <Partners />
          <Footer />
        </div>
      </LayoutWithSidebar>
    </div>
  )
}

export default ReportUploader