import React from "react";
import LayoutWithSidebar from "../../components/LayoutWithSidebar";
import Navbar from "../../components/Navbar";
import Img1 from "../../Assets/IconAndLogo/Gift.png";
// import Img2 from '../../Assets/IconAndLogo/Group 5745.png'
import Img3 from "../../Assets/IconAndLogo/Frame 2756.png";
import NoData from "../../components/NoData";
// import { Link } from 'react-router-dom'

function ManageRoles() {
  return (
    <div>
      <div className="ManageRoles">
        {/* INVITE USER */}
        <div
          className="modal fade"
          id="editrole"
          tabIndex="-1"
          aria-labelledby="example"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-body RolesModal p-4">
                <div className="">
                  <div className="header">
                    <h3 className="">Create Custom Role</h3>
                    <img data-bs-dismiss="modal" src={Img3} alt="" />
                  </div>
                  <div className="margin30"></div>
                  <h1 className="f20">Roles</h1>
                  <div className="margin30"></div>
                  <div className="Rolediv">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="discount" className="fw3">
                          Role Name
                        </label>{" "}
                        <br />
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>
                            <span>Customer Supports</span>
                          </option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="discount" className="fw3">
                          Role Name
                        </label>{" "}
                        <br />
                        <div className="selectBord">
                          <span className="f11">
                            This role is best suited for the
                            Organization/Association executives or anyone
                            appointed by them that will require full admin
                            access
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="margin30"></div>
                  <div className="">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="accordion" id="accordionEditRole">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="eachss accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#RoleCollapse2"
                                aria-expanded="true"
                                aria-controls="RoleCollapse2"
                              >
                                <div className="">
                                  <p>Role 1</p>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="RoleCollapse2"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample1"
                            >
                              <div className="accordion-body">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect1"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect1"
                                  >
                                    Can View User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect2"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect2"
                                  >
                                    Can View and Edit User Management
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="accordion" id="accordionEditRole">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="eachss accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#RoleCollapse3"
                                aria-expanded="true"
                                aria-controls="RoleCollapse3"
                              >
                                <div className="">
                                  <p>Role 2</p>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="RoleCollapse3"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample1"
                            >
                              <div className="accordion-body">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect3"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect3"
                                  >
                                    Can View User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect4"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect4"
                                  >
                                    Can View and Edit User Management
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="accordion" id="accordionEditRole">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="eachss accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#RoleCollapse4"
                                aria-expanded="true"
                                aria-controls="RoleCollapse4"
                              >
                                <div className="">
                                  <p>Role 3</p>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="RoleCollapse4"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample1"
                            >
                              <div className="accordion-body">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect5"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect5"
                                  >
                                    Can View User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect6"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect6"
                                  >
                                    Can View and Edit User Management
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="accordion" id="accordionEditRole">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="eachss accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#RoleCollapse5"
                                aria-expanded="true"
                                aria-controls="RoleCollapse5"
                              >
                                <div className="">
                                  <p>Role 4</p>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="RoleCollapse1"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample1"
                            >
                              <div className="accordion-body">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect7"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect7"
                                  >
                                    Can View User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect8"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect8"
                                  >
                                    Can View and Edit User Management
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="accordion" id="accordionEditRole">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="eachss accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#RoleCollapse6"
                                aria-expanded="true"
                                aria-controls="RoleCollapse1"
                              >
                                <div className="">
                                  <p>Role 5</p>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="RoleCollapse6"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample1"
                            >
                              <div className="accordion-body">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect9"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect9"
                                  >
                                    Can View User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect10"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect10"
                                  >
                                    Can View and Edit User Management
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="accordion" id="accordionEditRole">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="eachss accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#RoleCollapse7"
                                aria-expanded="true"
                                aria-controls="RoleCollapse7"
                              >
                                <div className="">
                                  <p>Role 6</p>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="RoleCollapse7"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample1"
                            >
                              <div className="accordion-body">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect12"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect12"
                                  >
                                    Can View User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect13"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect13"
                                  >
                                    Can View and Edit User Management
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="accordion" id="accordionEditRole">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="eachss accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#RoleCollapse8"
                                aria-expanded="true"
                                aria-controls="RoleCollapse8"
                              >
                                <div className="">
                                  <p>Users Management</p>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="RoleCollapse8"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample1"
                            >
                              <div className="accordion-body">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect14"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect14"
                                  >
                                    Can View User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect15"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect15"
                                  >
                                    Can View and Edit User Management
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="accordion" id="accordionEditRole">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="eachss accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#RoleCollapse9"
                                aria-expanded="true"
                                aria-controls="RoleCollapse9"
                              >
                                <div className="">
                                  <p>Users Management</p>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="RoleCollapse9"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample1"
                            >
                              <div className="accordion-body">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect16"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect16"
                                  >
                                    Can View User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect17"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect17"
                                  >
                                    Can View and Edit User Management
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="accordion" id="accordionEditRole">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="eachss accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#RoleCollapse10"
                                aria-expanded="true"
                                aria-controls="RoleCollapse10"
                              >
                                <div className="">
                                  <p>Users Management</p>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="RoleCollapse10"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample1"
                            >
                              <div className="accordion-body">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect18"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect18"
                                  >
                                    Can View User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect19"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect19"
                                  >
                                    Can View and Edit User Management
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="accordion" id="accordionEditRole">
                          <div className="accordion-item">
                            <h2 className="accordion-header ">
                              <button
                                className="eachss accordion-button "
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#RoleCollapse11"
                                aria-expanded="true"
                                aria-controls="RoleCollapse11"
                              >
                                <div className="">
                                  <p>Users Management</p>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="RoleCollapse11"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample1"
                            >
                              <div className="accordion-body ">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect20"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect20"
                                  >
                                    Can View User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleselect21"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roleselect21"
                                  >
                                    Can View and Edit User Management
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <button
                          type="button"
                          className="btn dark-button100 m-0 mt-3 mb-3"
                          data-bs-toggle="modal"
                          data-bs-target="#edit"
                        >
                          Create Role
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ManageUser">
          <Navbar header="Manage User" />
          <div className="Navmargin"></div>
          <div className="paddingres">
            <div className="WhiteCard">
              <div className="header mb-3">
                <h2>Users</h2>
              </div>
              <div className="firstDivider">
                <div className="row">
                  <div className="col-md-4">
                    <div className="FirstContainer">
                      <div className="accordion" id="accordionExample1">
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="eachss accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne1"
                              aria-expanded="true"
                              aria-controls="collapseOne1"
                            >
                              {/* <div className="">
                                                        <img src={SidebarIcon.icon3} alt="" />
                                                    </div> */}
                              <div className="me-5 mb-3">
                                <p>Default Roles</p>
                              </div>
                            </button>
                          </h2>
                          <div
                            id="collapseOne1"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample1"
                          >
                            <div className="accordion-body">
                              <div className="">
                                <img src={Img1} alt="" />
                                <p className="ms-2">Super Admin</p>
                              </div>
                              <div className="">
                                <img src={Img1} alt="" />
                                <p className="ms-2">Operations</p>
                              </div>
                              <div className="">
                                <img src={Img1} alt="" />
                                <p className="ms-2">Receptionist</p>
                              </div>
                              <div className="">
                                <img src={Img1} alt="" />
                                <p className="ms-2">Customer Support</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="custom mt-5">
                        <h3 className="ms-3 f15 fw4">Custom roles</h3>
                        <p className="f15 Grey">
                          You can create your own custom roles, and choose
                          exactly what team members can see and do
                        </p>
                        <button className="mixBtnBackgorund fw4 mt-3">
                          Create a Custom Role
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="SecondContainer">
                      <div className="first">
                        <div className="row">
                          <div className="col-md-7 mb-3">
                            <div className="">
                              <h3>Super Admin</h3>
                              <p>
                                This role is best suited for the
                                Organization/Association executives or anyone
                                appointed by them that will require full admin
                                access
                              </p>
                              <button
                                className="btn dark-button mt-3 m-0 ps-4 pe-4"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#editrole"
                              >
                                Edit Role
                              </button>
                            </div>
                          </div>
                          <div className="col-md-5 mb-3">
                            <div className="">
                              <h3>Team Members with this role</h3>
                              <div className="flexDivSpace mt-4">
                                <div className="">
                                  <span className="NameCircle f15">AA</span>
                                </div>
                                <button className="light-button f13 BorderNone fw4">
                                  View members
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="second mt-3">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <div className="can mt-3">
                              <div className="header">
                                <p>What role can they access</p>
                              </div>
                              <div className="AllCheck mt-3 ms-4">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults1"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults1"
                                  >
                                    Can View User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults2"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults2"
                                  >
                                    Can View and Edit User Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults3"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults3"
                                  >
                                    Can View Partners Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults6"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults6"
                                  >
                                    Can View and Edit Partner Management
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults5"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults5"
                                  >
                                    Can View Financial Metrics
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults4"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults4"
                                  >
                                    Can View and export Revenues
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults7"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults7"
                                  >
                                    Can initiate Refund
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults8"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults8"
                                  >
                                    Can create and manage settlement Account
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults9"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults9"
                                  >
                                    Can view and export Payment
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults10"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults10"
                                  >
                                    Can edit business settings & preferences
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults11"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults11"
                                  >
                                    Can view Business settings & preference
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults12"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults12"
                                  >
                                    Can View and export Revenues
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults13"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults13"
                                  >
                                    Can Manage API Keys & Webhooks
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults14"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults14"
                                  >
                                    Can Manage and Invite Users
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults15"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults15"
                                  >
                                    Can view users
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults16"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults16"
                                  >
                                    Can Invite Users
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults17"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults17"
                                  >
                                    can manage Bank Accounts setting
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefaults18"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefaults18"
                                  >
                                    Can view Bank Accounts settings
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="cant mt-3">
                              <div className="header">
                                <p>What this role can’t access</p>
                              </div>
                              <NoData
                                width="47%"
                                title="This role has full access!"
                                body="Any team member with this role can access all the sections of the dashboard."
                              />
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
    </div>
  );
}

export default ManageRoles;
