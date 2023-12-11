import React from 'react'
import Logo from '../Assets/IconAndLogo/Screenshot 2023-04-08 at 20.20 1.png'
import Notification from '../Assets/IconAndLogo/mdi_bell-notification-outline.png'
import Arrow from '../Assets/IconAndLogo/arrow-down.png'
import Dot from '../Assets/IconAndLogo/Aitime.png'
import { Link } from 'react-router-dom'

function NavbarTwo(props) {
    return (
        <div>
            <div className="NavbarTwo" >
                <div className="title">
                    <h2>{props.header}</h2>
                </div>
                <div className="together">
                    <div className="utils">
                        <div className="bord">
                            <img src={Notification} alt="" />
                        </div>
                    </div>
                    <div className="details">
                        <div className="img">
                            <img className='' src={Logo} alt="" />
                            <span className='roundballSecondary'></span>
                        </div>
                        <div className="ms-2">
                            <h3>Emma Taylor</h3>
                            <p>Agape Diagnostic Center</p>
                        </div>
                        <div className="arrow ms-5">
                            <img src={Arrow} alt="" />
                            <div className="profile ">
                                <p className='p-3 pb-0 fw6'>MY PROFILE</p>
                                <Link to="/login">
                                    <div className="mt-3 dot">
                                        <img src={Dot} alt="" />
                                        <p>Log out</p>
                                    </div>
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarTwo