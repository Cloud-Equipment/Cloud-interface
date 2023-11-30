import React from 'react'
import Cloud from '../Assets/ActivitiesForm/Screenshot 2023-04-08 at 20.20 1.png'
import { SocialIcon } from '../data/data'


function Footer() {
    return (
        <div>
            <div className="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="cloud">
                                <img src={Cloud} alt="" />
                                <p className='mt-4'>We are always open to discuss your project and improve your online presence.</p>
                                <div className="social">
                                    <div className="m-3">
                                        <p><b>Email me at</b></p>
                                        <p className='m-0'>contact@website.io</p>
                                    </div>
                                    <div className="m-3">
                                        <p><b>Call us</b></p>
                                        <p className='m-0'>0927 6277 28525</p>
                                    </div>
                                    <div className="m-3">
                                        <p><b>Social Media</b></p>
                                        <div className="each">
                                            <img src={SocialIcon.social1} alt="" />
                                            <img src={SocialIcon.social2} alt="" />
                                            <img src={SocialIcon.social3} alt="" />
                                            <img src={SocialIcon.social4} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 mb-3">
                            <ul>
                                <li><b>COMPANY</b></li>
                                <li>Our Story</li>
                                <li>Careers</li>
                                <li>Community</li>
                                <li>About us</li>
                                <li>Press</li>
                            </ul>
                        </div>
                        <div className="col-md-2 mb-3">
                            <ul>
                                <li><b>LEGAL</b></li>
                                <li>Legal</li>
                                <li>Terms and Conditions</li>
                                <li>Privacy Policy</li>
                                <li>Disclaimer</li>
                            </ul>
                        </div>
                        <div className="col-md-2 mb-3">
                            <ul>
                                <li><b>RESOURCES</b></li>
                                <li>For Investors</li>
                                <li>For OEMs & Suppliers</li>
                                <li>For Healthcare Providers</li>
                                <li>Others</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer