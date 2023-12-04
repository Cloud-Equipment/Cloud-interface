import React from 'react'

function LeftBanner(props) {
    return (
        <div>
            <div className="LeftBanner">
                <div className="">
                    <div className="text">
                        <h1><span>{props.GreenText}</span> {props.BigText}</h1>
                        <p>{props.SmallText}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBanner