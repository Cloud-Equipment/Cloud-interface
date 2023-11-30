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
                                <li>
                                    <div className="">
                                        <img className='img' src={SidebarIcon.icon1} alt="" />
                                    </div>
                                    <div className=""><p>Dashboard</p></div>

                                </li>
                                <li>
                                    <div className="">
                                        <img src={SidebarIcon.icon2} alt="" />
                                    </div>
                                    <div className=""><p>Receptionist</p></div>

                                </li>
                                <li>
                                    <div className="">
                                        <img src={SidebarIcon.icon3} alt="" />
                                    </div>
                                    <div className=""><p>Admin Role</p></div>

                                </li>
                                <li>
                                    <div className="">
                                        <img src={SidebarIcon.icon3} alt="" />
                                    </div>
                                    <div className=""><p>Settings</p></div>

                                </li>
                                <li>
                                    <div className="">
                                        <img src={SidebarIcon.icon3} alt="" />
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
                                    <p>Erik Gunsel</p>
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