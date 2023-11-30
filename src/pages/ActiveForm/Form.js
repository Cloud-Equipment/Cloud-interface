import React from 'react'
import Img1 from '../../Assets/IconAndLogo/Vector 2.png'
import Img2 from '../../Assets/IconAndLogo/iconamoon_clock-light.png'
import Naira from '../../Assets/IconAndLogo/fa6-solid_naira-sign.png'
import Arrow from '../../Assets/IconAndLogo/arrow-down.png'
function Form() {
    return (
        <div>
            <div className="ActiveFormSection p-5 pt-4 pb-4 ">
                <div className="relative ">
                    <div className="headers">
                        <div className="date ">
                            <img src={Img2} alt="" />
                            <p>24th November, 2023 </p>
                            <p>12:36.27</p>
                        </div>
                        <div className="report mt-1">
                            <img src={Img1} alt="" />
                            <p className=''>View Report</p>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="form">
                    <form action="">
                        <div className="sett">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="formss">
                                        <label htmlFor="Defaultselectexample" className='label'>Procedure/Test Ordered</label>
                                        <div className="inputt">
                                            <p>Select Procedure/Test</p>
                                            <img src={Arrow} alt="" />
                                        </div>
                                        <div className="testDropdown">
                                            <div className="header">
                                                <p>Select one option...</p>
                                            </div>
                                            <div className="each">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                    <label class="form-check-label" for="flexCheckDefault">
                                                        Cholesterol Profile
                                                    </label>
                                                </div>
                                                <div className="amount">
                                                    <img src={Naira} alt="" />
                                                    <p>500.00</p>
                                                </div>
                                            </div>
                                            <div className="each">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults" />
                                                    <label class="form-check-label" for="flexCheckDefaults">
                                                        Liver Test
                                                    </label>
                                                </div>
                                                <div className="amount">
                                                    <img src={Naira} alt="" />
                                                    <p>1000.00</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="formss">
                                        <label htmlFor="Defaultselectexample" className='label'>Age of the Patient</label>
                                        <div className="inputt">
                                            <p>Select Patient  age</p>
                                            <img src={Arrow} alt="" />
                                        </div>
                                        <div className="testDropdown">
                                            <div className="header">
                                                <p>Select one option...</p>
                                            </div>
                                            <div className="each">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaultt" />
                                                    <label class="form-check-label" for="flexCheckDefaultt">
                                                        Cholesterol Profile
                                                    </label>
                                                </div>
                                                <div className="amount">
                                                    <img src={Naira} alt="" />
                                                    <p>500.00</p>
                                                </div>
                                            </div>
                                            <div className="each">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaultts" />
                                                    <label class="form-check-label" for="flexCheckDefaultts">
                                                        Liver Test
                                                    </label>
                                                </div>
                                                <div className="amount">
                                                    <img src={Naira} alt="" />
                                                    <p>1000.00</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="deduction">
                            <h2>Deduction</h2>
                            <p>You are to populate the Rebate Amount to efficiency calculate a deduction</p>
                            <div className="dividerTwo"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form