import React from 'react'
import Logo from '../Assets/IconAndLogo/Clip path group.png'
import User from '../Assets/IconAndLogo/mdi_user-circle.png'
import { Link } from 'react-router-dom'

function NavbarPage() {
  return (
    <div>
        <div className="container">
            <div className=" NavbarPage">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="middle">
                    <ul>
                        <li>Products</li>
                        <li>Company</li>
                        <li>Resources</li>
                    </ul>
                </div>
                <div className="last">
                    <Link to="/login"><button className='light-button'>Log in</button></Link>
                    <button className='dark-button'>
                        <div className="">
                            <img src={User} alt="" />
                            <span>Get started</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavbarPage