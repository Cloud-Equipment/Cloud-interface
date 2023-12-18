import React from 'react'
import LayoutWithSidebar from '../../components/LayoutWithSidebar'
import Navbar from '../../components/Navbar'
import Naira from '../../Assets/IconAndLogo/fa6-solid_naira-sign.png'
import RedNaira from '../../Assets/IconAndLogo/Vector (1).png'
import Icon from '../../Assets/IconAndLogo/Vector 3.png'
import { Link } from 'react-router-dom'

function ReportDetails() {
    return (
        <div>
            <div className="ReportDetails">
                <LayoutWithSidebar >
                    <div className="ReportDetails">
                        <Navbar
                            header="Report"
                        />
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
                                    <button className='dark-button ps-5 pe-5 me-4 mb-3'>New Appointment</button>
                                    <button className='grey-button ps-5 pe-5 me-4 mb-3'>Refer Patient</button>
                                    <button className='grey-border-button ps-5 pe-5 me-4 mb-3'>Upload a result</button>
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
                                                <span>345, Sarju Appt., Mota Varacha, Surat Gujarat, India.</span>
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
                                            <p>You are to populate the Rebate Amount to efficiency calculate a deduction</p>
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
                                                    <p className='gray'>Subtotal:</p>
                                                </div>
                                                <div className="amount">
                                                    <img src={Naira} alt="" />
                                                    <p className='fw3'>2,000.00</p>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="">
                                                    <p className='gray'>Discount:</p>
                                                </div>
                                                <div className="amount">
                                                    <p className='fw3 red'>( </p>
                                                    <img src={RedNaira} alt="" />
                                                    <p className='fw3 red'> 1,000.00</p>
                                                    <p className='fw3 red'> )</p>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="">
                                                    <p className='f20'>Total:</p>
                                                </div>
                                                <div className="amount">
                                                    <img src={Naira} alt="" />
                                                    <p className='f20'>1,000.00</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutWithSidebar>
            </div>
        </div>
    )
}

export default ReportDetails