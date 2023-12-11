import React, { useState } from 'react'
import Img2 from '../../Assets/IconAndLogo/iconamoon_clock-light.png'
import Naira from '../../Assets/IconAndLogo/fa6-solid_naira-sign.png'
import RedNaira from '../../Assets/IconAndLogo/Vector (1).png'
import Arrow from '../../Assets/IconAndLogo/arrow-down.png'
import Int from '../../Assets/IconAndLogo/Group.png'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import NewReport from '../../components/NewReport'

function Form() {

    const [value, setValue] = useState()
    console.log(value)

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
                    </div>
                    <div className="">
                        <NewReport
                            Type="View"
                        />
                    </div>
                </div>
                <div className="divider"></div>
                <div className="form">
                    <form action="">
                        <div className="deduction">
                            <h2>Patient Details</h2>
                            <p>You are to fill in the patient Basic Information</p>
                            <div className="dividerTwo"></div>
                        </div>

                        <div className="Rebate">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>User ID</label> <br />
                                        <input type="text" name="" id="discount" placeholder='AGA/453|' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Patient Name</label>  <br />
                                        <input type="text" name="" id="discount" placeholder='Adepoju Deborah ' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="margin30"></div>
                        <div className="Rebate">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Patient Mobile Number</label>  <br />
                                        <input type="number" name="" id="discount" placeholder='+234 08143626356' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Referrer’s Email Address</label>  <br />
                                        <input type="email" name="" id="discount" placeholder='Enter Referrer Email Address' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="margin30"></div>
                        <div className="Rebate">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="discount" className='fw3'>Gender</label>  <br />
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected ><span>Select Gender</span></option>
                                        <option value="2" >Male </option>
                                        <option value="3">Female</option>
                                        <option value="3">Other</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="discount" className='fw3'>Age of the Patient</label>  <br />
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected ><span>Select Patient  age</span></option>
                                        <option value="2" >Less than 1year </option>
                                        <option value="3">1 Year</option>
                                        <option value="3">2 Years</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="margin30"></div>
                        <div className="Rebate">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Address</label>  <br />
                                        <input type="text" name="" id="discount" placeholder='No 24, W. F. Kumuyi Street,' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="formss">
                                        <label htmlFor="Defaultselectexample" className='label'>Procedure category</label>  <br />
                                        <div className="inputt">
                                            <p>Select Procedure/Test</p>
                                            <img src={Arrow} alt="" />
                                        </div>
                                        <div className="testDropdown">
                                            <div className="header">
                                                <p>Select from the category</p>
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

                            </div>
                        </div>


                        <div className="sett">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="formss">
                                        <label htmlFor="Defaultselectexample" className='label'>Procedures</label>  <br />
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

                            </div>
                        </div>
                        <div className="deduction">
                            <h2>Deduction</h2>
                            <p>You are to populate the Rebate Amount to efficiency calculate a deduction</p>
                            <div className="dividerTwo"></div>
                        </div>
                        <div className="Rebate">
                            <div className="row">
                                <div className="col-md-6 mt-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaultt" />
                                        <label class="form-check-label" for="flexCheckDefaultt">
                                            Rebate
                                        </label>
                                    </div>
                                    <div className="int">
                                        <img src={Int} alt="" />
                                        <p className='fw3'>click on the box if rebate was paid</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Discount Code</label>  <br />
                                        <input type="text" name="" id="discount" placeholder='Enter code' />
                                    </div>
                                    <div className="int">
                                        <img src={Int} alt="" />
                                        <p className='fw3'>50% Discount as being applied to this transaction - 1,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="margin30"></div>
                        <div className="Rebate">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Rebate Paid </label>  <br />
                                        <input type="text" name="" id="discount" placeholder='Enter Amount of Rebate Paid' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Referrers Name</label>  <br />
                                        <input type="text" name="" id="discount" placeholder='Enter Referee Name' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="margin30"></div>
                        <div className="Rebate">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Referrer’s Hospital/Laboratory</label>  <br />
                                        <input type="text" name="" id="discount" placeholder='Enter Laboratory Name' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Referrer’s Email Address</label>  <br />
                                        <input type="text" name="" id="discount" placeholder='Enter Referrer Email Address' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="margin30"></div>
                        <div className="phone">
                            <div className="col-md-6">
                                <label htmlFor="discount" className='fw3'>Referrer’s Phone Number</label>  <br />
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    value={value}
                                    onChange={setValue}
                                />
                            </div>
                        </div>
                        <div className="margin30"></div>
                        <div className="remark">
                            <label htmlFor="discount" className='fw3'>Remark</label> <br />
                            <textarea name="" id="" placeholder='Leave a Message for the diagnostic center'></textarea>
                        </div>
                        <div className="margin40"></div>
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
                        <div className="margin30"></div>
                        <div className="ttext">
                            <p className='gray f15'>The data collected helps us to track utilisation and tailor our support under the EIP to your needs. Thank you for filling it out correctly</p>
                        </div>
                        <div className="margin40"></div>
                        <center>
                            <button type="submit" className='submitForm'>Submit</button>
                        </center>
                        <div className="margin30"></div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Form