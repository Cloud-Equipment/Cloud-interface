import React from 'react'
import LayoutWithSidebar from '../../components/LayoutWithSidebar'
import NavbarTwo from '../../components/NavbarTwo'
import Img1 from '../../Assets/IconAndLogo/Gift.png'
import Img2 from '../../Assets/IconAndLogo/Group 5745.png'
// import { Link } from 'react-router-dom'

function ManageRoles() {
    return (
        <div>
            <div className="ManageRoles">
                <LayoutWithSidebar >
                    <div className="ManageUser">
                        <NavbarTwo
                            header="Manage User"
                        />
                        <div className="margin100"></div>
                        <div className="p-30">
                            <div className="WhiteCard">
                                <div className="header mb-3">
                                    <h2>Users</h2>
                                </div>
                                <div className="firstDivider">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="FirstContainer">
                                                <div class="accordion" id="accordionExample1">
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header">
                                                            <button class="eachss accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne1">
                                                                {/* <div className="">
                                                        <img src={SidebarIcon.icon3} alt="" />
                                                    </div> */}
                                                                <div className="me-5 mb-3"><p>Default Roles</p></div>
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne1" class="accordion-collapse collapse show" data-bs-parent="#accordionExample1">
                                                            <div class="accordion-body">
                                                                <div className="">
                                                                    <img src={Img1} alt="" />
                                                                    <p className='ms-2'>Super Admin</p>
                                                                </div>
                                                                <div className="">
                                                                    <img src={Img1} alt="" />
                                                                    <p className='ms-2'>Operations</p>
                                                                </div>
                                                                <div className="">
                                                                    <img src={Img1} alt="" />
                                                                    <p className='ms-2'>Receptionist</p>
                                                                </div>
                                                                <div className="">
                                                                    <img src={Img1} alt="" />
                                                                    <p className='ms-2'>Customer Support</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="custom mt-5">
                                                    <h3 className='ms-3 f15 fw4'>Custom roles</h3>
                                                    <p className='f15 Grey'>You can create your own custom roles, and choose exactly what team members can see and do</p>
                                                    <button className='mixBtnBackgorund fw4 mt-3'>Create a Custom Role</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="SecondContainer">
                                                <div className="first">
                                                    <div className="row">
                                                        <div className="col-md-7">
                                                            <div className="">
                                                                <h3>Super Admin</h3>
                                                                <p>This role is best suited for the Organization/Association executives or anyone appointed by them that will require full admin access</p>
                                                                <button className='dark-button mt-3 m-0 ps-4 pe-4  '>Edit Role</button>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="">
                                                                <h3>Team Members with this role</h3>
                                                                <div className="flexDivSpace mt-4">
                                                                    <div className="">
                                                                        <span className='NameCircle f15'>AA</span>
                                                                    </div>
                                                                    <button className='light-button f13 BorderNone fw4'>View members</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="second mt-3">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="can mt-3">
                                                                <div className="header">
                                                                    <p>What role can they access</p>
                                                                </div>
                                                                <div className="AllCheck mt-3 ms-4">
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults1" />
                                                                        <label class="form-check-label" for="flexCheckDefaults1">
                                                                            Can View User Management
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults2" />
                                                                        <label class="form-check-label" for="flexCheckDefaults2">
                                                                            Can View and Edit User Management
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults3" />
                                                                        <label class="form-check-label" for="flexCheckDefaults3">
                                                                            Can View Partners Management
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults6" />
                                                                        <label class="form-check-label" for="flexCheckDefaults6">
                                                                            Can View and Edit Partner Management
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults5" />
                                                                        <label class="form-check-label" for="flexCheckDefaults5">
                                                                            Can View Financial Metrics
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults4" />
                                                                        <label class="form-check-label" for="flexCheckDefaults4">
                                                                            Can View and export Revenues
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults7" />
                                                                        <label class="form-check-label" for="flexCheckDefaults7">
                                                                            Can initiate Refund
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults8" />
                                                                        <label class="form-check-label" for="flexCheckDefaults8">
                                                                            Can create and manage settlement Account
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults9" />
                                                                        <label class="form-check-label" for="flexCheckDefaults9">
                                                                            Can view and export Payment
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults10" />
                                                                        <label class="form-check-label" for="flexCheckDefaults10">
                                                                            Can edit business settings & preferences
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults11" />
                                                                        <label class="form-check-label" for="flexCheckDefaults11">
                                                                            Can view Business settings & preference
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults12" />
                                                                        <label class="form-check-label" for="flexCheckDefaults12">
                                                                            Can View and export Revenues
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults13" />
                                                                        <label class="form-check-label" for="flexCheckDefaults13">
                                                                            Can Manage API Keys & Webhooks
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults14" />
                                                                        <label class="form-check-label" for="flexCheckDefaults14">
                                                                            Can Manage and Invite Users
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults15" />
                                                                        <label class="form-check-label" for="flexCheckDefaults15">
                                                                            Can view users
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults16" />
                                                                        <label class="form-check-label" for="flexCheckDefaults16">
                                                                            Can Invite Users
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults17" />
                                                                        <label class="form-check-label" for="flexCheckDefaults17">
                                                                            can manage Bank Accounts setting
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaults18" />
                                                                        <label class="form-check-label" for="flexCheckDefaults18">
                                                                            Can view Bank Accounts settings
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="cant mt-3">
                                                                <div className="header">
                                                                    <p>What this role can’t access</p>
                                                                </div>
                                                                <div className="Access">
                                                                    <center>
                                                                        <img src={Img2} alt="" />
                                                                        <h4 className='mt-4'>This role has full access!</h4>
                                                                        <p>Any team member with this role can access all the sections of the dashboard.</p>
                                                                    </center>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutWithSidebar>
            </div >
        </div>
    )
}

export default ManageRoles