import React from "react";
import Img1 from "../Assets/IconAndLogo/Vector 2.png";
// import { Link } from 'react-router-dom'

function NewReport(props) {
  return (
    <div>
      <div className="ReportHeader">
        <a href="/create-report-form">
          <div className="NewReport mt-1 ms-5">
            <img src={Img1} alt="" />
            <p className="">{props.Type} Report</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default NewReport;
