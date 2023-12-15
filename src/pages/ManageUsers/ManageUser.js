import React from 'react'
import LayoutWithSidebar from '../../components/LayoutWithSidebar'
import Navbar from '../../components/Navbar'
import Search from '../../Assets/IconAndLogo/search-status.png'
import Icon1 from '../../Assets/IconAndLogo/icon.png'
import Icon2 from '../../Assets/IconAndLogo/icon 2.png'
// import Icon3 from '../../Assets/IconAndLogo/Group 3.png'
// import Icon4 from '../../Assets/IconAndLogo/state-layer.png'
import Icon5 from '../../Assets/IconAndLogo/Group 5.png'
// import Icon6 from '../../Assets/IconAndLogo/fa6-solid_naira-sign.png'
import Left from '../../Assets/IconAndLogo/primary (1).png'
import Right from '../../Assets/IconAndLogo/primary (2).png'
import Down from '../../Assets/IconAndLogo/primary.png'
import Img1 from '../../Assets/IconAndLogo/Frame 2755.png'
import { Link } from 'react-router-dom'

function ManageUser() {
    return (
        <div>
            <div>

                <div className="ManageUsers">
                    {/* ENABLE MODAL */}
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body EnableModal">
                                    <center>
                                        <img src={Img1} alt="" />
                                        <p>You currently do not have 2FA enabled on your account. Enable 2FA now to continue</p>
                                        <div className="buttonss">
                                            <button type="button" class="btn cancel" data-bs-dismiss="modal">Cancel</button>
                                            <button type="button" class="btn success" data-bs-toggle="modal" data-bs-target="#edit">Enable 2FA</button>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* DISABLE USER MODAL */}
                    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body EnableModal">
                                    <center>
                                        <img src={Img1} alt="" />
                                        <p>Are you sure you want to disable this user? User won’t have access to the platform again.</p>
                                        <div className="buttonss">
                                            <button type="button" class="btn cancel" data-bs-dismiss="modal">Cancel</button>
                                            <button type="button" class="btn success" data-bs-toggle="modal" data-bs-target="#edit">Yes, edit</button>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* INVITE USER */}
                    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                        <div class="modal-dialog modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body InviteModal p-5">
                                    <h3 className='mb-3 f20'>Invite team members</h3>
                                    <div className="mb-3">
                                        <label htmlFor="discount" className=' fw3'>Referrer’s Email Address</label>  <br />
                                        <input type="email" className='inputts' name="" id="discount" placeholder='Enter Referrer Email Address' />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="discount" className='fw3'>Choose Role</label>  <br />
                                        <select class="form-select inputts selectHolder" aria-label="Default select example">
                                            <option selected ><span>Choose Role</span></option>
                                        </select>
                                    </div>
                                    <div className="pt-3">
                                        <button type="button" class="btn dark-button  w-100 m-0 f17 Dm" data-bs-toggle="modal" data-bs-target="#edit">Invite Team Member</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <LayoutWithSidebar >
                        <div className="ManageUser">
                            <Navbar
                                header="Manage User"
                            />
                            <div className="margin75"></div>
                            <div className="AllManageBtn pt-5 pb-5">
                                <div className="manageButtons">
                                    <button class='btn secondaryButtonBackground' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2">Invite User</button>
                                    <Link to="/manage-role">
                                        <button className='secondaryButtonBorder'>Manage Roles</button>
                                    </Link>

                                    <button type="button" class="btn secondaryButtonNoBg" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Enforce 2FA
                                    </button>
                                </div>
                            </div>
                            <div className="p-30">
                                <div className="WhiteCard">
                                    <div className="header mb-3">
                                        <h2>Users</h2>
                                    </div>
                                    <div className="Check mb-2" style={{overflowX:"auto"}}>
                                        <div className="search flexDiv mb-3">
                                            <input type="text" placeholder='Search Patient Name' />
                                            <img src={Search} alt="" />
                                        </div>
                                        <div className="sort flexDiv mb-3">
                                            <p>Role</p>
                                            <div className="">
                                                <div class="form">
                                                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                        <option value="1">Show all</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="filter flexDi mb-3">
                                            <img src={Icon1} alt="" />
                                            <p>Filter by</p>
                                        </div>
                                        <div className="export flexDiv mb-3">
                                            <img src={Icon2} alt="" />
                                            <p>Export</p>
                                        </div>
                                    </div>
                                    <div className="USERSTable">
                                        <div className="header mb-3">
                                            <h2>Team members - 5</h2>
                                        </div>
                                        <div className="" style={{overflowX:"auto"}}>
                                            <table className='w-100'>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Date & Time Added</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email Address</th>
                                                        <th scope="col">Role</th>
                                                        <th scope="col">2FA Status</th>
                                                        <th scope="col">Last login</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className=''>
                                                        <th scope="">
                                                            01-12-2023 . 10:23.27
                                                        </th>
                                                        <td>Emmanuel Abdullahi S.</td>
                                                        <td>emmanuel@cloudequipments.io</td>
                                                        <td>Receptionist</td>
                                                        <td>
                                                            <div className="flexDiv">
                                                                <div className="roundballNo me-2"></div>
                                                                <p>Enabled</p>
                                                            </div>
                                                        </td>
                                                        <td>Sep 26, 2023, 12:41PM</td>
                                                        <td>
                                                            <div className="dot">
                                                                <img className='' src={Icon5} alt="" />
                                                                <div className="firstDiv">
                                                                    <div className="flex">
                                                                        {/* <img src={Icon4} alt="" /> */}
                                                                        <span type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                                                            Disable User
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex">
                                                                        {/* <img src={Icon4} alt="" /> */}
                                                                        <span type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                            Enforce 2FA
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className=''>
                                                        <th scope="">
                                                            01-12-2023 . 10:23.27
                                                        </th>
                                                        <td>Emmanuel Abdullahi S.</td>
                                                        <td>emmanuel@cloudequipments.io</td>
                                                        <td>Receptionist</td>
                                                        <td>
                                                            <div className="flexDiv">
                                                                <div className="roundballNo me-2"></div>
                                                                <p>Enabled</p>
                                                            </div>
                                                        </td>
                                                        <td>Sep 26, 2023, 12:41PM</td>
                                                        <td>
                                                            <div className="dot">
                                                                <img className='' src={Icon5} alt="" />
                                                                <div className="firstDiv">
                                                                    <div className="flex">
                                                                        {/* <img src={Icon4} alt="" /> */}
                                                                        <span type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                                                            Disable User
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex">
                                                                        {/* <img src={Icon4} alt="" /> */}
                                                                        <span type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                            Enforce 2FA
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
        </div>
    )
}

export default ManageUser