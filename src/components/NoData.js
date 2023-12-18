import React from 'react'
import Img2 from '../Assets/IconAndLogo/Group 5745.png'

function NoData(props) {
    return (
        <div>
            <div className="NoData">
                <center>
                    <img src={Img2} alt="" width={props.width} />
                    <h4 className='mt-4'>{props.title}</h4>
                    <p>{props.body}.</p>
                </center>
            </div>
        </div>
    )
}

export default NoData