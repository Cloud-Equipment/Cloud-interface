import React from "react";
import WavingEmoji from "../../assets/images/auth/waving-hand.svg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { environment } from "../../environments";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    // console.log(data_);
    axios
      .post(`${environment.baseUrl}/user-manager/account/login`, data)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        toast.error("Login Failed");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Authform">
      <img src={WavingEmoji} alt="" />

      <h2 className="font-semibold text-2xl md:text-3xl mt-2">Welcome back!</h2>

      <p className="text-greyText2 text-sm mt-3">
        Please login to access your account.
      </p>

      <div className="auth-input-label-holder mt-10">
        <label>Email Address</label>
        <input
          {...register("email")}
          placeholder="mail@company.com"
          className="ce-input"
        />
      </div>

      <div className="auth-input-label-holder mt-10">
        <label>Password</label>
        <input {...register("password")} type="password" className="ce-input" />
      </div>

      <NavLink to="." className="text-greenText">
        Forgot Password?
      </NavLink>

      <button className="submit-button mt-10">Log In</button>

      <p className="text-center mt-5">
        Don't have an account?{" "}
        <NavLink to="." className="text-greenText">
          Contact support
        </NavLink>{" "}
      </p>
    </form>
  );
};

export default Login;
