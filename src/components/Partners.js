import React from 'react'
import { PartnersImg } from '../data/data'

function Partners() {
    return (
        <div>
            <div className="Partners">
                <div className="container">
                    <div className="">
                        <img src={PartnersImg.partner1} alt="" />
                    </div>
                    <div className="">
                        <img src={PartnersImg.partner2} alt="" />
                    </div>
                    <div className="">
                        <img src={PartnersImg.partner3} alt="" />
                    </div>
                    <div className="">
                        <img src={PartnersImg.partner4} alt="" />
                    </div>
                    <div className="">
                        <img src={PartnersImg.partner5} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Partners