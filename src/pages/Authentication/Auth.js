import React from 'react'
import NavbarPage from '../../components/NavbarPage'
import LeftBanner from '../../components/LeftBanner'
import Wave from '../../Assets/IconAndLogo/waving-hand.png'
import VerificationForm from '../../components/verificationForm'


function Auth() {
  return (
    <div>
        <div className="VERIFY">
                <NavbarPage />
                <div className="container-xxxl">
                    <div className="row">
                        <div className="col-md-6">
                            <LeftBanner
                                GreenText="Increasing access"
                                BigText="to quality and life-saving machines"
                                SmallText="We assist with financing to minimise upfront costs as well as operational and maintenance support. This helps you get the most out of the equipment and ensure the best quality care to your patients and the public."
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="outer">
                                <div className=" VerifyForm">
                                    <div className="header">
                                        <img src={Wave} alt="" />
                                        <h3 className='mt-2'>Authenticate your account</h3>
                                        <div className="margin30"></div>
                                        <p>Protecting your activities our priority. Please confirm your account by entering the authentication code sent to <b>deborah@cloudequipment.io</b></p>
                                        <div className="margin30"></div>
                                        <VerificationForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Auth