import axios from "axios";
import React from "react";
import { environment } from "../../environments";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
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
      .post(`${environment.baseUrl}/user-manager/account/register`, {
        ...data,
        roles: ["FacilityAdmin"],
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg);
          navigate("/auth/login");
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Sign up failed");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Authform">
      <h2 className="font-semibold text-2xl md:text-3xl mt-2">Sign Up</h2>

      <p className="text-greyText2 text-sm mt-3">
        Kindly input your details as follows.
      </p>

      <div className="auth-input-label-holder mt-4">
        <label>First Name</label>
        <input {...register("firstName")} className="ce-input" />
      </div>

      <div className="auth-input-label-holder mt-4">
        <label>Last Name</label>
        <input {...register("lastName")} className="ce-input" />
      </div>

      <div className="auth-input-label-holder mt-4">
        <label>Facility Id</label>
        <input {...register("facilityId")} className="ce-input" />
      </div>

      <div className="auth-input-label-holder mt-4">
        <label>Email Address</label>
        <input
          {...register("email")}
          placeholder="mail@company.com"
          className="ce-input"
        />
      </div>

      <div className="auth-input-label-holder mt-4">
        <label>Password</label>
        <input {...register("password")} type="password" className="ce-input" />
      </div>

      <button className="submit-button mt-10" type="submit">
        Sign up
      </button>
    </form>
  );
};

export default Register;
