import React from 'react'
import { SidebarIcon } from '../data/data'
import Logo from '../Assets/IconAndLogo/Screenshot 2023-04-08 at 20.20 1.png'

function Sidebar() {
    return (
        <div>
            <div className="Sidebar">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="margin50"></div>
                <div className="Icons">
                    <div className="Top">
                        <center>
                            <ul>
                                <li><img src={SidebarIcon.icon1} alt="" /></li>
                                <li><img src={SidebarIcon.icon2} alt="" /></li>
                                <li><img src={SidebarIcon.icon3} alt="" /></li>
                                <li><img src={SidebarIcon.icon4} alt="" /></li>
                                <li><img src={SidebarIcon.icon5} alt="" /></li>
                            </ul>
                        </center>
                    </div>
                    <div className="Last">
                        <center>
                        <ul>
                            <li><img src={SidebarIcon.icon6} alt="" /></li>
                            <li><img src={SidebarIcon.icon7} alt="" /></li>
                            <li><img src={SidebarIcon.icon8} alt="" /></li>
                        </ul>
                        </center>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar