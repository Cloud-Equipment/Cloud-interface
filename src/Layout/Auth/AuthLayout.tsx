import React from "react";
import AuthNavbar from "./AuthNavbar";
import "./Auth.scss";

const AuthLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <div>
      <AuthNavbar />

      <div className="lg:grid lg:grid-cols-2">
        <div className="p-10 pb-20 Authbanner">
          <h1 className="text-white text-4xl">
            <span className="text-greenText">Increasing access</span> to quality
            and life-saving machines
          </h1>

          <p className="text-white mt-4">
            We assist with financing to minimise upfront costs as well as
            operational and maintenance support. This helps you get the most out
            of the equipment and ensure the best quality care to your patients
            and the public.
          </p>
        </div>

        <div className="h-[calc(100vh-76px)] grid place-items-center p-10 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
