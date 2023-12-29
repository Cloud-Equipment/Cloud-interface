import React from 'react'
import Img1 from '../../Assets/IconAndLogo/unsplash_7bMdiIqz_J4.png'
import Img2 from '../../Assets/IconAndLogo/Group 1000000904 2.png'
import Img3 from '../../Assets/IconAndLogo/Group 1000000904.png'

function Banner() {
    return (
        <div>
            <div className="BannerDashboard">
                <div className="row">
                    <div className="col-md-6">
                        <div className="visits p-3">
                            <h4 className=' f15 fw3'>Visits for Today</h4>
                            <h1 className='mb-4'>104</h1>
                            <div className="cards">
                                <div className="flexDiv">
                                    <div className="">
                                        <div className="card1">
                                            <p className=''>New Patients</p>
                                            <div className="numb">
                                                <div className="">
                                                <h2>40</h2>
                                                </div>
                                                <div className="chart flexDiv green">
                                                    <p>51% </p>
                                                    <img src={Img2} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="card1">
                                            <p className=''>Old Patients</p>
                                            <div className="numb">
                                               <div className=""> <h2>64</h2></div>
                                                <div className="chart flexDiv red">
                                                    <p>20% </p>
                                                    <img src={Img3} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-5">
                        <div className="img">
                            <img src={Img1} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner