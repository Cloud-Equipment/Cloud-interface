import React from 'react'
import Img1 from '../../Assets/IconAndLogo/Ellipse 16.png'
import Img2 from '../../Assets/IconAndLogo/Ellipse 2.png'
import Img3 from '../../Assets/IconAndLogo/Ellipse 2 (1).png'
import Img4 from '../../Assets/IconAndLogo/akar-icons_edit.png'
import Img5 from '../../Assets/IconAndLogo/Chevron Right 2.png'
import Img6 from '../../Assets/IconAndLogo/Chevron Right 3.png'

function AppointmentTable() {
    return (
        <div>
            <div className="AppointmentTable">
                <div className="header mb-3">
                    <h1 className='f20'>Booked Appointment</h1>
                </div>
                <table className='w-100'>
                    <thead>
                        <tr className='p-2'> 
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Diagnostics </th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='' >
                            <th scope="">
                                <div class="form-check" >
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaultt" />
                                </div>
                            </th>
                            <td>24-03-2023, 05:53PM</td>
                            <td>AGP/453</td>
                            <td>
                                <div className="jane">
                                    <img src={Img1} alt="" />
                                    <div className="">
                                        <p>Jane Doe Joanne</p>
                                        <span>adebalanced04@gmail.com</span>
                                    </div>
                                </div>
                            </td>
                            <td>Radiography Test</td>
                            <td>
                                <div className="con">
                                    <img src={Img2} alt="" />
                                    <p className='greenC'>Confirmed</p>
                                </div>
                            </td>
                            <td>
                                <img src={Img4} alt="" className='action' />
                            </td>
                        </tr>
                        <tr className='' >
                            <th scope="">
                                <div class="form-check" >
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaultt" />
                                </div>
                            </th>
                            <td>24-03-2023, 05:53PM</td>
                            <td>AGP/453</td>
                            <td>
                                <div className="jane ">
                                    <img src={Img1} alt="" />
                                    <div className="">
                                        <p>Jane Doe Joanne</p>
                                        <span>adebalanced04@gmail.com</span>
                                    </div>
                                </div>
                            </td>
                            <td>Radiography Test</td>
                            <td>
                                <div className="con">
                                    <img src={Img3} alt="" />
                                    <p className='greyC'>In-coming</p>
                                </div>
                            </td>
                            <td>
                                <img src={Img4} alt="" className='action' />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="down">
                    <p>Showing 10 from 160 data</p>
                    <div className="">
                        <ul>
                            <li><img src={Img5} alt="" /></li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>...</li>
                            <li>11</li>
                            <li>12</li>
                            <li><img src={Img6} alt="" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentTable