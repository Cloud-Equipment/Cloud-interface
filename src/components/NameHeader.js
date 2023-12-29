import React from 'react'

function NameHeader(props) {
  return (
    <div>
        <div className="NameHeader">
            <h2>Hello, <span>{props.name}</span></h2>
            <p>{props.details}</p>
        </div>
    </div>
  )
}

export default NameHeader