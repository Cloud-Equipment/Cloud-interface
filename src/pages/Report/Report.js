import React, { useEffect, useState } from 'react'
import LayoutWithSidebar from '../../components/LayoutWithSidebar'
import Navbar from '../../components/Navbar'
import NameHeader from '../../components/NameHeader'
import NewReport from '../../components/NewReport'
import Search from '../../Assets/IconAndLogo/search-status.png'
import Icon1 from '../../Assets/IconAndLogo/icon.png'
import Icon2 from '../../Assets/IconAndLogo/icon 2.png'
// import Icons from '../../Assets/IconAndLogo/arrows.png'
import Icon3 from '../../Assets/IconAndLogo/Group 3.png'
import Icon5 from '../../Assets/IconAndLogo/Group 5.png'
import Icon6 from '../../Assets/IconAndLogo/fa6-solid_naira-sign.png'
import Left from '../../Assets/IconAndLogo/primary (1).png'
import Right from '../../Assets/IconAndLogo/primary (2).png'
import Down from '../../Assets/IconAndLogo/primary.png'
import { ReportIcon } from '../../data/data'
import { Link } from 'react-router-dom'
import Img1 from '../../Assets/IconAndLogo/Frame 2755.png'
import Form from '../ActiveForm/Form'
import NoData from '../../components/NoData'
import axios from 'axios'
import { BASE_URL } from '../../data/data'
// import Modal from '../../components/Modal'

function Report() {


    const [report, setReport] = useState(true)
    const [data, setData] = useState([])

    const datas = true
    useEffect(() => {
        if (!datas) {
            setReport(false)
        }
    }, [datas])

    useEffect(() => {
        const url = `${BASE_URL}/service-manager/procedures/getAll`
        axios.get(url)
            .then((res) => {
                if (res.data.success === true) {
                    setData(res.data.data)
                }
            })
            .catch((err) => console.log(err));
    },[])


    const dateFormat = (inputDateString) => {
        const inputDate = new Date(inputDateString);

        const day = inputDate.getDate().toString().padStart(2, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = inputDate.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }

    const NewData = data.reverse().slice(0, 10);


    return (
        <div>

            <div className="Report">
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body EditBodyReport">
                                <center>
                                    <img src={Img1} alt="" />
                                    <p>Are you sure you want to Edit this entry?</p>
                                    <div className="buttonss">
                                        <button type="button" class="btn cancel" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn success" data-bs-toggle="modal" data-bs-target="#edit">Yes, edit</button>
                                    </div>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                    <div class="modal-dialog modal-xl ">
                        <div class="modal-content">
                            <div class="modal-body EditBodyReport">
                                <Form />
                            </div>
                        </div>
                    </div>
                </div>
                <LayoutWithSidebar >
                    <div className="Report">
                        <Navbar
                            header="Report"
                        />
                        <div className="Navmargin"></div>

                        <div className="paddingres">
                            <NameHeader
                                name="Emma Taylor"
                                details="Stay up-to-date with your patients report."
                            />
                            <NewReport
                                Type="New"
                            />
                            <div className="WhiteCard">
                                <div className="header mb-3">
                                    <h2>All Report</h2>
                                </div>
                                <div className="Check mb-2" style={{ flexWrap: "wrap" }}>
                                    <div className="search flexDiv mb-3">
                                        <input type="text" placeholder='Search Patient Name' />
                                        <img src={Search} alt="" />
                                    </div>
                                    <div className="sort flexDiv mb-3">
                                        <p>Sort by:</p>
                                        <div className="">
                                            <div class="form">
                                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                    <option value="1">Newest to oldest</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="filter flexDiv mb-3">
                                        <img src={Icon1} alt="" />
                                        <p>Filter by</p>
                                    </div>
                                    <div className="export flexDiv mb-3">
                                        <img src={Icon2} alt="" />
                                        <p>Export</p>
                                    </div>
                                </div>
                                <div className="reportTable">
                                    <div className="header mb-3">
                                        <h2>All Report</h2>
                                    </div>
                                    <div className="OverflowTable" >
                                        {report ?
                                            <table className='w-100'>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Date & Time</th>
                                                        <th scope="col">Procedure/Test Ordered</th>
                                                        <th scope="col">Age of Patient</th>
                                                        <th scope="col">Referrer’s Name</th>
                                                        <th scope="col">Referrer’s Hospital</th>
                                                        <th scope="col">Phone Number</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {NewData.map((each, index) => (

                                                        <tr className='' key={index}>
                                                            <th scope="">
                                                                <div className="flexDiv">
                                                                    <img src={Icon3} alt="" />
                                                                    <span>{dateFormat(each.date)}</span>
                                                                </div>
                                                            </th>
                                                            <td>{each.medServiceName}</td>
                                                            <td>...</td>
                                                            <td>{each.referrerName}</td>
                                                            <td>{each.refererHospital}</td>
                                                            <td>{each.phoneNo}</td>
                                                            <td>
                                                                <div className="flexDiv">
                                                                    <img src={Icon6} alt="" />
                                                                    <span>{each.amount}.00</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="dot">
                                                                    <img className='' src={Icon5} alt="" />
                                                                    <div className="firstDiv">
                                                                        <div className="flex" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                            <img src={ReportIcon.edit} alt="" />
                                                                            <span>Edit Test</span>
                                                                        </div>
                                                                        <Link to="/report-details">
                                                                            <div className="flex">
                                                                                <img src={ReportIcon.profile} alt="" />
                                                                                <span>View Profile</span>
                                                                            </div>
                                                                        </Link>
                                                                        <div className="flex">
                                                                            <img src={ReportIcon.share} alt="" />
                                                                            <span>Share Result</span>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <img src={ReportIcon.confirm} alt="" />
                                                                            <span>Confirm Test</span>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <img src={ReportIcon.upload} alt="" />
                                                                            <span>Upload Result</span>
                                                                        </div>
                                                                        {/* <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                    
                                                                 </button> */}
                                                                    </div>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table> : <div className="">
                                                <table className='w-100'>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Date & Time</th>
                                                            <th scope="col">Procedure/Test Ordered</th>
                                                            <th scope="col">Age of Patient</th>
                                                            <th scope="col">Referrer’s Name</th>
                                                            <th scope="col">Referrer’s Hospital</th>
                                                            <th scope="col">Phone Number</th>
                                                            <th scope="col">Amount</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                    </tbody>
                                                </table>
                                                <NoData
                                                    title="This role has full access!"
                                                    width="20%"
                                                    body="Any team member with this role can access all the sections of the dashboard."
                                                />
                                            </div>
                                        }

                                    </div>
                                    <div className="perPage mt-3">
                                        <div className="abs">
                                            <div className="ms-2 me-2">
                                                <p>Items per page</p>
                                            </div>
                                            <div className="bord ms-2 me-2 flexDiv">
                                                <p className='me-2'>8</p>
                                                <img src={Down} alt="" />
                                            </div>
                                            <div className="LeftRight ms-2 me-2">
                                                <div className="bord ms-2 me-2">
                                                    <img src={Left} alt="" />
                                                </div>
                                                <div className="bord ms-2 me-2">
                                                    <img src={Right} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="margin50"></div>
                                <div className="data">
                                    <p>Showing 10 from 160 data</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutWithSidebar>
            </div >
        </div >
    )
}

export default Report