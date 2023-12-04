import React from 'react'
import NavbarPage from '../../components/NavbarPage'
import LeftBanner from '../../components/LeftBanner'

function Login() {
    return (
        <div>
            <div className="Login">
                <NavbarPage />
                <div className="container-xxxl">
                    <div className="col-md-6">
                        <LeftBanner 
                            GreenText= "Increasing access"
                            BigText="to quality and life-saving machines"
                            SmallText="We assist with financing to minimise upfront costs as well as operational and maintenance support. This helps you get the most out of the equipment and ensure the best quality care to your patients and the public."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login