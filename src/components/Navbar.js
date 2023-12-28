import React, { useState } from "react";
// import Logo from '../Assets/IconAndLogo/Screenshot 2023-04-08 at 20.20 1.png'
import Notification from "../Assets/IconAndLogo/mdi_bell-notification-outline.png";
import menu from "../Assets/IconAndLogo/pepicons-pop_menu.png";
import Arrow from "../Assets/IconAndLogo/arrow-down.png";
import user from "../Assets/IconAndLogo/Pic (1).png";
import Arrow1 from "../Assets/IconAndLogo/heroicons-outline_logout (1).png";
import Dot from "../Assets/IconAndLogo/Aitime.png";
import X from "../Assets/IconAndLogo/x.png";
import { Link } from "react-router-dom";
// import { calculateWeight } from '../utils/utils'
// import NameHeader from './NameHeader'
import { SidebarIcon } from "../data/data";

function Navbar() {
  const [isSidenavOpen, setSidenavOpen] = useState(false);

  const toggleSidenav = () => {
    setSidenavOpen(!isSidenavOpen);
  };

  return (
    <div>
      <div className="Navbar">
        <div className="title">
          <h2>Dashboard</h2>
        </div>
        <div className="together">
          <div className="utils">
            <div className="bord">
              <img src={Notification} alt="" />
            </div>
          </div>
          <div className="details">
            <div className="img">
              <img className="" src={user} alt="" />
              <span className="roundballSecondary"></span>
            </div>
            <div className="ms-2">
              <h3>Emma Taylor</h3>
              <p>Agape Diagnostic Center</p>
            </div>
            <div className="arrow ms-5">
              <img src={Arrow} alt="" />
              <div className="profile ">
                <p className="p-3 pb-0 fw6">MY PROFILE</p>
                <Link to="/login">
                  <div className="mt-1 dot">
                    <img src={Dot} alt="" />
                    <p>Log out</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="MobileNavbar">
        <div className="container pt-3 pb-3 ">
          <div className="all">
            <div className="menu">
              <div className="SidebarMobile">
                <img src={menu} alt="" onClick={toggleSidenav} />
                <div className={`sidenav ${isSidenavOpen ? "open" : ""}`}>
                  <div className="MobileSidebar">
                    <div className="flexDivSpace">
                      <div className="facility">
                        <img src={SidebarIcon.FacilityLogo} alt="" />
                        <p>AGAPE DIAGNOSTIC CENTER</p>
                      </div>
                      <img src={X} alt="" onClick={toggleSidenav} />
                    </div>
                    <div className="Icons">
                      <div className="Top">
                        <p className="header">MAIN</p>
                        <center>
                          <ul>
                            <li className="eachs">
                              <div className="">
                                <img
                                  className="img"
                                  src={SidebarIcon.icon1}
                                  alt=""
                                />
                              </div>
                              <div className="">
                                <p>Dashboard</p>
                              </div>
                            </li>
                            <li className="eachs">
                              <div className="">
                                <img src={SidebarIcon.icon2} alt="" />
                              </div>
                              <Link to="/reports">
                                <div className="">
                                  <p>Report</p>
                                </div>
                              </Link>
                            </li>
                            <li className="">
                              <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                  <h2 className="accordion-header">
                                    <button
                                      className="eachss accordion-button"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseOne"
                                      aria-expanded="true"
                                      aria-controls="collapseOne"
                                    >
                                      <div className="">
                                        <img src={SidebarIcon.icon3} alt="" />
                                      </div>
                                      <div className="me-5">
                                        <p>Manage</p>
                                      </div>
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse show"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body">
                                      <Link to="/manage-user">
                                        <div className="">
                                          <p> - </p>
                                          <p className="ms-2">Manage User</p>
                                        </div>
                                      </Link>
                                      <div className="">
                                        <p> - </p>
                                        <p className="ms-2">Manage Facility</p>
                                      </div>
                                      <div className="">
                                        <p> - </p>
                                        <p className="ms-2">
                                          Discount Management
                                        </p>
                                      </div>
                                      <div className="">
                                        <p> - </p>
                                        <p className="ms-2">Price Management</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="eachs">
                              <div className="">
                                <img src={SidebarIcon.icon4} alt="" />
                              </div>
                              <div className="">
                                <p>Settings</p>
                              </div>
                            </li>
                            <li className="eachs">
                              <div className="">
                                <img src={SidebarIcon.icon5} alt="" />
                              </div>
                              <div className="">
                                <p>Log out</p>
                              </div>
                            </li>
                          </ul>
                        </center>
                      </div>
                      <div className="Last">
                        <div className="message-header">
                          <p>MESSAGES</p>
                          <img src={SidebarIcon.cross} alt="" />
                        </div>
                        <ul>
                          <li>
                            <div className="img">
                              <img src={SidebarIcon.UserImg} alt="" />
                              <span className="roundball"></span>
                            </div>
                            <div className="">
                              <p>Support</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="together">
              <div className="utils">
                <div className="bord">
                  <img src={Notification} alt="" />
                </div>
              </div>
              <div className="details">
                <div className="img">
                  <img className="" src={user} alt="" />
                </div>
                <div className="arrow ms-2">
                  <img src={Arrow} alt="" />
                  <div className="profile ">
                    <p className="p-3 pb-0 fw6">MY PROFILE</p>
                    <Link to="/login">
                      <div className=" dot">
                        <img src={Arrow1} alt="" />
                        <p>Log out</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className=" mt-4">
                        <NameHeader
                            name="Emma Taylor"
                        />
                    </div> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
