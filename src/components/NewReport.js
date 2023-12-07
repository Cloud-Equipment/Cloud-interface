import React from 'react'
import Img1 from '../Assets/IconAndLogo/Vector 2.png'

function NewReport(props) {
    return (
        <div>
            <div className="ReportHeader">
                <div className="NewReport mt-1 ms-5">
                    <img src={Img1} alt="" />
                    <p className=''>{props.Type} Report</p>
                </div>
            </div>
        </div>
    )
}

export default NewReport