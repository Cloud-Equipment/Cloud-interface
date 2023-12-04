import React from 'react'
import { SidebarIcon } from '../data/data'

function Sidebar() {
    return (
        <div>
            <div className="Sidebar">
                <div className="facility">
                    <img src={SidebarIcon.FacilityLogo} alt="" />
                    <p>AGAPE DIAGNOSTIC CENTER</p>
                </div>
                <div className="Icons">
                    <div className="Top">
                        <p className='header'>MAIN</p>
                        <center>
                            <ul>
                                <li className='eachs'>
                                    <div className="">
                                        <img className='img' src={SidebarIcon.icon1} alt="" />
                                    </div>
                                    <div className=""><p>Dashboard</p></div>

                                </li>
                                <li className='eachs'>
                                    <div className="">
                                        <img src={SidebarIcon.icon2} alt="" />
                                    </div>
                                    <div className=""><p>Report</p></div>

                                </li>
                                <li class="" >
                                    <div class="accordion" id="accordionExample">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header">
                                                <button class="eachss accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    <div className="">
                                                        <img src={SidebarIcon.icon3} alt="" />
                                                    </div>
                                                    <div className="me-5"><p>Manage</p></div>
                                                </button>
                                            </h2>
                                            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <div className="">
                                                        <p> - </p>
                                                        <p className='ms-2'>Manage User</p>
                                                    </div>
                                                    <div className="">
                                                        <p> - </p>
                                                        <p className='ms-2'>Manage Facility</p>
                                                    </div>
                                                       <div className="">
                                                        <p> - </p>
                                                        <p className='ms-2'>Discount Management</p>
                                                    </div>
                                                    <div className="">
                                                        <p> - </p>
                                                        <p className='ms-2'>Price Management</p>
                                                    </div>
                                                    <div className="">
                                                        <p> - </p>
                                                        <p className='ms-2'>Service Management</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className='eachs'>
                                    <div className="">
                                        <img src={SidebarIcon.icon4} alt="" />
                                    </div>
                                    <div className=""><p>Settings</p></div>

                                </li>
                                <li className='eachs'>
                                    <div className="">
                                        <img src={SidebarIcon.icon5} alt="" />
                                    </div>
                                    <div className=""><p>Log out</p></div>

                                </li>
                            </ul>
                        </center>
                    </div>
                    <div className="Last">
                        <div className="message-header">
                            <p>MESSAGES</p>
                            <img src={SidebarIcon.cross} alt="" />
                        </div>
                        <ul>
                            <li>
                                <div className="img">
                                    <img src={SidebarIcon.UserImg} alt="" />
                                    <span className='roundball'></span>
                                </div>
                                <div className="">
                                    <p>Support</p>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar