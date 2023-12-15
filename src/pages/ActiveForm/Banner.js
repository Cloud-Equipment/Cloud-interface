import React from 'react'
import Arrow from '../../Assets/ActivitiesForm/Arrow 4.png'

function Banner() {
    return (
        <div>
            <center>
                <div className="Navmargin"></div>
                <div className="ActiveBanner">
                    <div className="arrow">
                        <img src={Arrow} alt="" />
                        <p className='ms-2 activity'>Activities</p>
                    </div>
                    <div className="text col-md-9">
                        <h1>Daily Procedure Tracker</h1>
                        <p>Dear Partner, kindly fill out this form for every procedure done at your facility. We appreciate you compliance and support.</p>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default Banner