import React from "react";
import NavbarPage from "../../components/NavbarPage";
import LeftBanner from "../../components/LeftBanner";
import Wave from "../../Assets/IconAndLogo/waving-hand.png";

function Login() {
  return (
    <div>
      <div className="Login">
        <NavbarPage />
        <div className="container-xxxl">
          <div className="row">
            <div className="col-md-6">
              <LeftBanner
                GreenText="Increasing access"
                BigText="to quality and life-saving machines"
                SmallText="We assist with financing to minimise upfront costs as well as operational and maintenance support. This helps you get the most out of the equipment and ensure the best quality care to your patients and the public."
              />
            </div>
            <div className="col-md-6">
              <div className="outer">
                <div className=" LoginForm">
                  <div className="header">
                    <img src={Wave} alt="" />
                    <h3 className="mt-2">Welcome back!</h3>
                    <p>Please login to access your account.</p>
                    <div className="margin30"></div>
                    <form action="">
                      <div className="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          className=""
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          for="exampleFormControlInput12"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className=""
                          id="exampleFormControlInput12"
                          placeholder="*****"
                        />
                        <span>Forgot Password ?</span>
                      </div>
                      <div className="margin30"></div>
                      <center>
                        <button
                          className="mb-3 dark-button w-100 f20"
                          type="submit"
                        >
                          Log In
                        </button>
                        <p>
                          Don't have an account? <span>Contact support</span>
                        </p>
                      </center>
                    </form>
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

export default Login;
