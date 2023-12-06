import React, { useState } from "react";
// import Button from "../common/button";
// import axiosInstance from "../../services/AxiosConfig";
// import ShowToast from "../../common/website/Toast";
// import { useSelector } from "react-redux";
// import { selectUserDetails } from "../../features/userSlice";
// import { ScaleLoader } from "react-spinners";

export default function VerificationForm({ onNextStep }) {
  // const [isLoading, setIsLoading] = useState(false);
  const [codeBox, setCodeBox] = useState(new Array(6).fill(""));
  console.log(codeBox)
  // const userDetails = useSelector(selectUserDetails);

  // const handleNext = async () => {
  //   const isCodeValid = codeBox.every((value) => value.trim() !== "");
  //   if (!isCodeValid) {
  //     ShowToast({ type: "error", text: "Please enter verification code" });
  //     return;
  //   }

  //   const otp = codeBox.join("");
  //   setIsLoading(true);
  //   try {
  //     const response = await axiosInstance.post("/authentication/verify/otp", {
  //       email: userDetails.email,
  //       otp,
  //     });

  //     const successMessage =
  //       response.data.message || "OTP Verification Successful";

  //     const token = response.data.token;

  //     localStorage.setItem("pspUserToken", token);
  //     axiosInstance.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${token}`;

  //     ShowToast({ type: "success", text: successMessage });

  //     console.log(
  //       "OTP Verification successful",
  //       response.data,
  //       response.data.message,
  //       otp
  //     ); //remove console

  //     onNextStep();
  //   } catch (error) {
  //     const errorMessage =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.message) ||
  //       "Error verifying email";

  //     console.error("Error verifying email", errorMessage); //Remove console
  //     ShowToast({ type: "error", text: errorMessage });
  //   }
  //   setIsLoading(false);
  // };

  // RESEND OTP
  // const handleResendOtp = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axiosInstance.put(
  //       "/authentication/verify/resend",
  //       { email: userDetails.email }
  //     );
  //     const successMessage = response.data.message || "OTP Sent Successful";
  //     ShowToast({ type: "success", text: successMessage });
  //     setCodeBox(new Array(6).fill(""));
  //     console.log("New OTP", response.data, response.data.message);
  //   } catch (error) {
  //     const errorMessage =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.message) ||
  //       "Error verifying email";
  //     console.error("Error verifying email", errorMessage); //Remove console
  //     ShowToast({ type: "error", text: errorMessage });
  //   }
  //   setIsLoading(false);
  // };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setCodeBox([
      ...codeBox.map((d, idx) => (idx === index ? element.value : d)),
    ]);
    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  function handleDelete(e, index) {
    if (e.key === "Backspace" && e.target.previousSibling) {
      e.preventDefault();
      e.target.previousSibling.focus();

      setCodeBox([...codeBox.map((data, i) => (i !== index ? data : ""))]);
    } else if (
      e.key === "Backspace" &&
      !e.target.previousSibling &&
      e.target.nextSibling
    ) {
      e.preventDefault();
      setCodeBox([...codeBox.map((data, i) => (i !== index ? data : ""))]);
    } else if (e.key === "Enter") {
      onNextStep();
    }
  }

  function handlePaste(e) {
    const value = e.clipboardData.getData("text");
    if (isNaN(value)) return false;
    const updatedValue = value.toString().split("").slice(0, codeBox.length);
    setCodeBox(updatedValue);
    console.log(codeBox)

    const focusedInput = e.target.parentNode.querySelector("input:focus");
    if (focusedInput) {
      focusedInput.blur();
    }

    const lastInput = e.target.parentNode.querySelector(
      'input[type="password"]:last-child'
    );
    if (lastInput) {
      lastInput.focus();
    }
  }

  return (
    <form className="authForm">
      <div className="verifyInput_Container">
        {codeBox.map((value, i) => (
          <input
            type="text"
            key={i}
            value={value}
            maxLength={1}
            onChange={(e) => handleChange(e.target, i)}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => {
              if (e.keyCode === 8 || e.key === "Backspace") {
                handleDelete(e, i);
              } else if (e.key === "ArrowLeft" && e.target.previousSibling) {
                e.target.previousSibling.focus();
              } else if (e.key === "ArrowRight" && e.target.nextSibling) {
                e.target.nextSibling.focus();
              }
            }}
            onPaste={(e) => {
              handlePaste(e);
            }}
          />
        ))}
      </div>
      <div className="margin30"></div>
      <button
        // fn={handleNext}
        // text={
        //   isLoading ? <ScaleLoader height={15} color="#ffffff" /> : "Continue"
        // }
        className="dark-button100 "
      >Authenticate</button>
    </form>
  );
}
