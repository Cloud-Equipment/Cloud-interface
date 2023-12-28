import React, { useEffect, useRef, useState } from "react";
import LayoutWithSidebar from "../../components/LayoutWithSidebar";
import Navbar from "../../components/Navbar";
import Naira from "../../Assets/IconAndLogo/fa6-solid_naira-sign.png";
import RedNaira from "../../Assets/IconAndLogo/Vector (1).png";
import Icon from "../../Assets/IconAndLogo/Vector 3.png";
import Icon1 from "../../Assets/IconAndLogo/Icon 3.png";
import Icon2 from "../../Assets/IconAndLogo/Group 48095749.png";
import { Link } from "react-router-dom";

function ReportDetails() {
  const [file, setFile] = useState();
  const [display, setDisplay] = useState("block");
  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  };

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    if (file) {
      setDisplay("none");
    } else {
      setDisplay("block");
    }
  }, [file]);

  return (
    <div>
      <div className="ReportDetails">
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body UploadResult">
                <div className="flexDivSpace header">
                  <h4 className="f20 fw5">Upload Result</h4>
                  <img src={Icon1} alt="" data-bs-dismiss="modal" />
                </div>
                <div className="margin30"></div>
                <div className="discount">
                  <label htmlFor="discount" className="fw5">
                    Leave a Note
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="name"
                    id="discount"
                    placeholder="Leave a message "
                  />
                </div>
                <div className="margin30"></div>
                <center>
                  <div className="FileUpload">
                    <div className="details" style={{ display: display }}>
                      <div className="mb-3" onClick={() => handleClick()}>
                        <img src={Icon2} alt="" className="uploader" />
                      </div>
                      <p>
                        Drag and drop or{" "}
                        <span onClick={() => handleClick()}>
                          {" "}
                          choose a file
                        </span>{" "}
                        to upload your contacts.
                      </p>
                      <p>All .csv, .xlsx, and .xls file types are supported</p>
                    </div>
                    <img src={file} alt="" className="uploaded" />
                  </div>
                </center>
                <input
                  type="file"
                  onChange={handleChange}
                  ref={fileInput}
                  style={{ display: "none" }}
                />
                <div className="buttonss mt-3">
                  <button
                    type="button"
                    className="btn dark-button100"
                    data-bs-toggle="modal"
                    data-bs-target="#edit"
                  >
                    Upload Result
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ReportDetails">
          <Navbar header="Report" />
          <div className="Navmargin"></div>
          <div className="paddingres">
            <div className="WhiteCard">
              <div className="flexNoAlignSpace">
                <div className="top">
                  <h3>Procedure detail</h3>
                  <p>Patient Information</p>
                  <span>User ID: AGP/453</span>
                  <h5>Emma Ummuna</h5>
                </div>
                <div className="img">
                  <Link to="/reports">
                    <img src={Icon} alt="" />
                  </Link>
                </div>
              </div>

              <div className="btns">
                <button className="dark-button ps-5 pe-5 me-4 mb-3">
                  New Appointment
                </button>
                <button className="grey-button ps-5 pe-5 me-4 mb-3">
                  Refer Patient
                </button>
                <button
                  className="grey-border-button ps-5 pe-5 me-4 mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Upload a result
                </button>
              </div>
              <div className="margin20"></div>
              <div className="TableCard">
                <div className="container">
                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <p>Phone Number</p>
                      <span>+234 70 34522211</span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Email</p>
                      <span>johnsmith@gmail.com</span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Gender</p>
                      <span>Male</span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Age of Patient</p>
                      <span>19</span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Address</p>
                      <span>
                        345, Sarju Appt., Mota Varacha, Surat Gujarat, India.
                      </span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Procedure Category</p>
                      <span>johnsmith@gmail.com</span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Procedures</p>
                      <span>Cholesterol</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="margin40"></div>
              <div className="TableCard">
                <div className="container">
                  <div className="deduction">
                    <h2>Deduction</h2>
                    <p>
                      You are to populate the Rebate Amount to efficiency
                      calculate a deduction
                    </p>
                    <div className="dividerTwo"></div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-3 mb-4">
                      <p>Discount Code</p>
                      <span>ARGWETES</span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Rebate Paid</p>
                      <span>Enter Rebate Paid</span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Referrers Name</p>
                      <span>Abdullahi Mohammed</span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Referrer’s Email</p>
                      <span>anebiemmanuel@gmail.com</span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Referrers Hospital</p>
                      <span>Agape Laboratory Care</span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Referrer’s Number</p>
                      <span>08143313429</span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <p>Remark</p>
                      <span>Leave a Message</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="margin50"></div>
              <div className="">
                <div className="col-md-6">
                  <div className="total">
                    <div className="">
                      <div className="">
                        <p className="gray">Subtotal:</p>
                      </div>
                      <div className="amount">
                        <img src={Naira} alt="" />
                        <p className="fw3">2,000.00</p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <p className="gray">Discount:</p>
                      </div>
                      <div className="amount">
                        <p className="fw3 red">( </p>
                        <img src={RedNaira} alt="" />
                        <p className="fw3 red"> 1,000.00</p>
                        <p className="fw3 red"> )</p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <p className="f20">Total:</p>
                      </div>
                      <div className="amount">
                        <img src={Naira} alt="" />
                        <p className="f20">1,000.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetails;
