import React from 'react'

function NameHeader(props) {
  return (
    <div>
        <div className="NameHeader">
            <h2>Hello, <span>{props.name}</span></h2>
            <p>Stay up-to-date with your patients report.</p>
        </div>
    </div>
  )
}

export default NameHeader