import React from "react";
import AuthLayout from "../../Layout/Auth/AuthLayout";
import { AuthRouting } from "../../Routes/AuthRouting";

const Auth = () => {
  return (
    <AuthLayout>
      <AuthRouting />
    </AuthLayout>
  );
};

export default Auth;
